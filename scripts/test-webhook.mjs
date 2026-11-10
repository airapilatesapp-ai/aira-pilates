// Offline test of the Stripe webhook: fakes Stripe and Supabase on localhost and plays a customer's life cycle.
// Run: node scripts/test-webhook.mjs
import http from 'node:http';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const db = { subscribers: {}, users: {}, emails: [] };
const subs = {
  sub_1: { id: 'sub_1', customer: 'cus_1', status: 'trialing', trial_end: 1800000000, cancel_at_period_end: false,
    items: { data: [{ current_period_end: 1800000000, price: { recurring: { interval: 'year' } } }] } },
};

function serve(handler) {
  return new Promise((resolve) => {
    const s = http.createServer(async (req, res) => {
      let body = ''; for await (const c of req) body += c;
      const out = await handler(req, body ? JSON.parse(body) : null);
      res.writeHead(out.status || 200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(out.body ?? {}));
    }).listen(0, () => resolve(s));
  });
}

const stripe = await serve(async (req) => {
  assert.equal(req.headers.authorization, 'Bearer sk_test_x');
  const m = req.url.match(/^\/v1\/(subscriptions|customers|checkout\/sessions)\/([^/?]+)/);
  if (m && m[1] === 'subscriptions') return { body: subs[m[2]] };
  if (m && m[1] === 'customers') return { body: { id: m[2], email: 'Jane@Example.com' } };
  return { status: 404, body: { error: { message: 'nope' } } };
});
const supa = await serve(async (req, body) => {
  assert.equal(req.headers.apikey ? 'ok' : 'missing', 'ok');
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/rest/v1/subscribers' && req.method === 'POST') {
    const prev = db.subscribers[body.email] || {}; db.subscribers[body.email] = { ...prev, ...body }; return { status: 201, body: [db.subscribers[body.email]] };
  }
  if (u.pathname === '/rest/v1/subscribers' && req.method === 'PATCH') {
    const cus = u.searchParams.get('stripe_customer_id').replace('eq.', '');
    const rows = Object.values(db.subscribers).filter((r) => r.stripe_customer_id === cus);
    rows.forEach((r) => Object.assign(r, body)); return { body: rows };
  }
  if (u.pathname === '/auth/v1/admin/users') {
    if (db.users[body.email]) return { status: 422, body: { msg: 'A user with this email address has already been registered' } };
    db.users[body.email] = body; return { body: { id: 'u1' } };
  }
  if (u.pathname === '/auth/v1/otp') {
    db.emails.push({ to: body.email, redirect: u.searchParams.get('redirect_to'), create_user: body.create_user }); return { body: {} };
  }
  return { status: 404, body: { msg: 'unknown ' + u.pathname } };
});

process.env.STRIPE_SECRET_KEY = 'sk_test_x';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
process.env.SUPABASE_URL = `http://localhost:${supa.address().port}`;
process.env.SUPABASE_SECRET_KEY = 'sb_secret_x';
process.env.SUPABASE_PUBLIC_KEY = 'sb_publishable_x';
process.env.APP_URL = 'https://airapilates.com/';

// Point the Stripe helper at the fake server.
const realFetch = globalThis.fetch;
globalThis.fetch = (url, init) => realFetch(String(url).replace('https://api.stripe.com', `http://localhost:${stripe.address().port}`), init);

const { POST } = await import('../api/stripe-webhook.js');
const sign = (payload, secret = 'whsec_test', t = Math.floor(Date.now() / 1000)) =>
  `t=${t},v1=${crypto.createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex')}`;
async function send(event, sig) {
  const raw = JSON.stringify(event);
  const res = await POST(new Request('https://x/api/stripe-webhook', { method: 'POST', body: raw, headers: { 'stripe-signature': sig ?? sign(raw) } }));
  return { status: res.status, body: await res.json() };
}

// 1. Bad signature is refused.
let r = await send({ type: 'checkout.session.completed', data: { object: {} } }, 't=1,v1=abc');
assert.equal(r.status, 400);
r = await send({ type: 'x', data: { object: {} } }, sign('{}', 'wrong'));
assert.equal(r.status, 400);

// 2. Checkout completed: row saved, user created, access e-mail sent.
r = await send({ type: 'checkout.session.completed', data: { object: { mode: 'subscription', subscription: 'sub_1', customer: 'cus_1', customer_details: { email: 'Jane@Example.com' } } } });
assert.equal(r.status, 200, JSON.stringify(r.body));
const row = db.subscribers['jane@example.com'];
assert.equal(row.status, 'trialing'); assert.equal(row.plan, 'yearly'); assert.equal(row.stripe_customer_id, 'cus_1');
assert.ok(row.trial_end.startsWith('2027-01-15'));
assert.ok(db.users['jane@example.com']);
assert.deepEqual(db.emails[0], { to: 'jane@example.com', redirect: 'https://airapilates.com/app/', create_user: false });

// 3. Same checkout again (Stripe retry): no crash, user already exists.
r = await send({ type: 'checkout.session.completed', data: { object: { mode: 'subscription', subscription: 'sub_1', customer: 'cus_1', customer_details: { email: 'jane@example.com' } } } });
assert.equal(r.status, 200);

// 4. Trial turns into a paid subscription.
r = await send({ type: 'customer.subscription.updated', data: { object: { ...subs.sub_1, status: 'active', trial_end: null } } });
assert.equal(db.subscribers['jane@example.com'].status, 'active');

// 5. Payment fails: the app shows a warning.
subs.sub_1.status = 'past_due';
r = await send({ type: 'invoice.payment_failed', data: { object: { subscription: 'sub_1', customer: 'cus_1' } } });
assert.equal(db.subscribers['jane@example.com'].status, 'past_due');

// 6. Newer Stripe API shape for invoices.
subs.sub_1.status = 'active';
r = await send({ type: 'invoice.payment_succeeded', data: { object: { parent: { subscription_details: { subscription: 'sub_1' } }, customer: 'cus_1' } } });
assert.equal(db.subscribers['jane@example.com'].status, 'active');

// 7. Canceled: access closes.
r = await send({ type: 'customer.subscription.deleted', data: { object: { ...subs.sub_1, status: 'canceled' } } });
assert.equal(db.subscribers['jane@example.com'].status, 'canceled');

// 8. Subscription event for a customer we have never seen: looked up by e-mail and saved.
r = await send({ type: 'customer.subscription.created', data: { object: { ...subs.sub_1, id: 'sub_2', customer: 'cus_9', status: 'trialing' } } });
assert.equal(db.subscribers['jane@example.com'].stripe_customer_id, 'cus_9');

// 9. Old signature (replay) is refused.
const raw = JSON.stringify({ type: 'x', data: { object: {} } });
r = await send(JSON.parse(raw), sign(raw, 'whsec_test', Math.floor(Date.now() / 1000) - 3600));
assert.equal(r.status, 400);

// 10. One-time payment checkouts are ignored.
r = await send({ type: 'checkout.session.completed', data: { object: { mode: 'payment' } } });
assert.equal(r.status, 200); assert.ok(r.body.skipped);

stripe.close(); supa.close();
console.log('All webhook tests passed (10 scenarios).');
