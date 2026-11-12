// Server-side Supabase calls (database + auth admin) with plain fetch.
const base = () => {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL is not set');
  return url.replace(/\/+$/, '');
};
const secretHeaders = () => {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error('SUPABASE_SECRET_KEY is not set');
  return keyHeaders(key);
};
// New Supabase keys (sb_secret_…, sb_publishable_…) go only in the apikey header;
// older keys are JWTs (start with eyJ) and also go in Authorization.
function keyHeaders(key) {
  const h = { apikey: key, 'Content-Type': 'application/json' };
  if (/^eyJ/.test(key)) h.Authorization = `Bearer ${key}`;
  return h;
}

async function call(path, init) {
  const res = await fetch(base() + path, init);
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, body };
}

export async function upsertSubscriber(row) {
  const r = await call('/rest/v1/subscribers?on_conflict=email', {
    method: 'POST',
    headers: { ...secretHeaders(), Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ ...row, email: row.email.toLowerCase(), updated_at: new Date().toISOString() }),
  });
  if (!r.ok) throw new Error(`upsertSubscriber ${r.status}: ${JSON.stringify(r.body)}`);
  return r.body && r.body[0];
}

// Updates the row for a Stripe customer. Returns the updated rows (empty if none matched).
export async function updateByCustomer(customerId, fields) {
  const r = await call(`/rest/v1/subscribers?stripe_customer_id=eq.${encodeURIComponent(customerId)}`, {
    method: 'PATCH',
    headers: { ...secretHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
  });
  if (!r.ok) throw new Error(`updateByCustomer ${r.status}: ${JSON.stringify(r.body)}`);
  return r.body || [];
}

// Creates the login account for this email if it does not exist yet.
export async function ensureUser(email, lang) {
  const r = await call('/auth/v1/admin/users', {
    method: 'POST',
    headers: secretHeaders(),
    body: JSON.stringify({ email: email.toLowerCase(), email_confirm: true, user_metadata: { lang: lang || 'en' } }),
  });
  if (r.ok) return 'created';
  const msg = JSON.stringify(r.body || '').toLowerCase();
  if (r.status === 422 || msg.includes('already') || msg.includes('exists')) return 'exists';
  throw new Error(`ensureUser ${r.status}: ${JSON.stringify(r.body)}`);
}

// Sends the "Your access to Aira" e-mail (a one-tap login link) through Supabase Auth.
export async function sendAccessLink(email, redirectTo) {
  const key = process.env.SUPABASE_PUBLIC_KEY || process.env.SUPABASE_SECRET_KEY;
  const q = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : '';
  const r = await call('/auth/v1/otp' + q, {
    method: 'POST',
    headers: keyHeaders(key),
    body: JSON.stringify({ email: email.toLowerCase(), create_user: false }),
  });
  if (!r.ok) throw new Error(`sendAccessLink ${r.status}: ${JSON.stringify(r.body)}`);
  return true;
}

// Who is signed in? Checks the user's own access token with Supabase Auth.
// Returns the user ({ id, email, ... }) or null if the token is missing or invalid.
export async function userFromToken(token) {
  if (!token) return null;
  const key = process.env.SUPABASE_PUBLIC_KEY || process.env.SUPABASE_SECRET_KEY;
  const r = await call('/auth/v1/user', { headers: { apikey: key, Authorization: `Bearer ${token}` } });
  return r.ok && r.body && r.body.id ? r.body : null;
}

// The subscriber row for an e-mail (or null).
export async function subscriberByEmail(email) {
  const r = await call(`/rest/v1/subscribers?email=eq.${encodeURIComponent(email.toLowerCase())}&select=stripe_customer_id,status&limit=1`, {
    headers: secretHeaders(),
  });
  if (!r.ok) throw new Error(`subscriberByEmail ${r.status}: ${JSON.stringify(r.body)}`);
  return (r.body && r.body[0]) || null;
}
