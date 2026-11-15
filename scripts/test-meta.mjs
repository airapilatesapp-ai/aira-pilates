// Offline test for the Meta Conversions API events (Lead, StartTrial, Purchase). No network.
// Run: node scripts/test-meta.mjs
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

Object.assign(process.env, {
  SUPABASE_URL: 'https://fake.supabase.co', SUPABASE_SECRET_KEY: 'sb_secret_x', RESEND_API_KEY: 're_x',
  STRIPE_SECRET_KEY: 'sk_test_x', APP_URL: 'https://airapilates.app', META_CAPI_TOKEN: 'EAAtest',
});
const sent = [];
let session = {};
const J = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = async (url, init = {}) => {
  const u = String(url);
  if (u.startsWith('https://graph.facebook.com/')) { sent.push({ url: u, body: JSON.parse(init.body) }); return J({ events_received: 1 }); }
  if (u.includes('api.resend.com')) return J({ id: 'm1' });
  if (u.includes('/rest/v1/leads') && (init.method || 'GET') === 'GET') return J([]);
  if (u.includes('/rest/v1/subscribers') && (init.method || 'GET') === 'GET') return J([]);
  if (u.includes('/rest/v1/leads') && init.method === 'POST') return J([{ ...JSON.parse(init.body), token: crypto.randomUUID(), emails_sent: 0 }]);
  if (u.includes('/rest/v1/')) return J([{ stripe_customer_id: 'cus_1' }]);
  if (u.includes('api.stripe.com/v1/checkout/sessions/')) return J(session);
  if (u.includes('api.stripe.com/v1/subscriptions/')) return J({ id: 'sub_1', customer: 'cus_1', status: 'active', items: { data: [{ current_period_end: 1800000000, price: { recurring: { interval: 'year' } } }] } });
  throw new Error('unexpected fetch ' + u);
};
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const browser = { 'user-agent': 'Mozilla/5.0 Test', 'x-forwarded-for': '203.0.113.9, 10.0.0.1', cookie: 'a=1; _fbp=fb.1.1731600000000.123456789; _fbc=fb.1.1731600000000.IwAR_abc-1' };

const lead = await import('../api/lead.js');
const post = (body, headers = browser) => lead.POST(new Request('https://airapilates.app/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) }));
const answers = { goal: 'core', level: 1, time: 15, days: 3, areas: ['belly'], pains: ['back'] };

// 1. Lead with an id: one Lead event, hashed e-mail, browser data, no quiz answers.
let r = await post({ email: 'Jane@Example.com ', name: 'Jane', lang: 'en', src: 'ig', meta_id: 'lead_abc-123', answers });
assert.equal(r.status, 200);
assert.equal(sent.length, 1);
const ev = sent[0].body.data[0];
assert.match(sent[0].url, /graph\.facebook\.com\/v\d+\.0\/1449562126688655\/events\?access_token=EAAtest/);
assert.equal(ev.event_name, 'Lead'); assert.equal(ev.event_id, 'lead_abc-123'); assert.equal(ev.action_source, 'website');
assert.equal(ev.event_source_url, 'https://airapilates.app/start');
assert.deepEqual(ev.user_data.em, [sha('jane@example.com')]);
assert.equal(ev.user_data.client_ip_address, '203.0.113.9');
assert.equal(ev.user_data.client_user_agent, 'Mozilla/5.0 Test');
assert.equal(ev.user_data.fbp, 'fb.1.1731600000000.123456789');
assert.equal(ev.user_data.fbc, 'fb.1.1731600000000.IwAR_abc-1');
const raw = JSON.stringify(sent[0].body);
for (const word of ['core', 'belly', 'back', 'Jane', 'jane@']) assert.ok(!raw.includes(word), 'leaked ' + word);

// 2. No id (pixel off or second quiz), or Global Privacy Control: nothing sent.
sent.length = 0;
await post({ email: 'b@example.com', answers });
await post({ email: 'c@example.com', meta_id: 'lead_x', answers }, { ...browser, 'sec-gpc': '1' });
assert.equal(sent.length, 0);

// 3. Welcome page: StartTrial only with m=1, for a finished, recent subscription checkout.
const cs = await import('../api/checkout-session.js');
const get = (q) => cs.GET(new Request('https://airapilates.app/api/checkout-session?' + q, { headers: browser }));
session = { status: 'complete', mode: 'subscription', created: Math.floor(Date.now() / 1000) - 60, customer_details: { email: 'jane@example.com' } };
r = await get('session_id=cs_live_abc&m=1');
assert.equal((await r.json()).email, 'ja••@example.com');
assert.equal(sent.length, 1);
assert.equal(sent[0].body.data[0].event_name, 'StartTrial');
assert.equal(sent[0].body.data[0].event_id, 'trial_cs_live_abc');
assert.equal(sent[0].body.data[0].event_source_url, 'https://airapilates.app/welcome');
await get('session_id=cs_live_abc');                       // pixel off
session.created = Math.floor(Date.now() / 1000) - 3 * 86400; // old link
await get('session_id=cs_live_abc&m=1');
session = { status: 'open', mode: 'subscription', created: Math.floor(Date.now() / 1000) };
await get('session_id=cs_live_abc&m=1');                   // not paid
assert.equal(sent.length, 1);

// 4. Webhook: Purchase for a real charge, nothing for the $0 trial invoice.
sent.length = 0;
const wh = await import('../api/stripe-webhook.js');
const inv = (amount) => ({ type: 'invoice.payment_succeeded', data: { object: { id: 'in_' + amount, subscription: 'sub_1', amount_paid: amount, currency: 'usd', customer_email: 'jane@example.com' } } });
await wh.handleEvent(inv(0));
assert.equal(sent.length, 0);
await wh.handleEvent(inv(4999));
assert.equal(sent.length, 1);
const p = sent[0].body.data[0];
assert.equal(p.event_name, 'Purchase'); assert.equal(p.event_id, 'inv_in_4999'); assert.equal(p.action_source, 'system_generated');
assert.deepEqual(p.custom_data, { value: 49.99, currency: 'USD' });

// 5. No token: nothing sent, nothing breaks.
sent.length = 0; delete process.env.META_CAPI_TOKEN;
r = await post({ email: 'd@example.com', meta_id: 'lead_y', answers });
assert.equal(r.status, 200); assert.equal(sent.length, 0);

console.log('Meta events: all 5 scenarios passed');
