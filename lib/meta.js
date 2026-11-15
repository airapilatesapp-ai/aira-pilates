// Meta Conversions API: the server's copy of the funnel events, so ads still learn when a browser blocks the pixel.
// Each event carries the same event_id as the browser pixel, so Meta counts it once.
// Only the hashed e-mail and technical data go out. Quiz answers are never sent.
// Needs META_CAPI_TOKEN (Vercel). Without it, nothing is sent. Optional: META_TEST_EVENT_CODE, META_API_VERSION.
import crypto from 'node:crypto';

export const PIXEL_ID = process.env.META_PIXEL_ID || '1449562126688655';
const VERSION = process.env.META_API_VERSION || 'v24.0';

const sha = (s) => crypto.createHash('sha256').update(String(s).trim().toLowerCase()).digest('hex');
const COOKIE = /^fb\.\d\.\d{10,13}\.[\w.-]{1,500}$/;

function cookie(header, name) {
  const m = String(header || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

// Browser details from the visitor's own request (IP, browser, Meta cookies).
export function visitor(request) {
  const h = request.headers;
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || null;
  const fbp = cookie(h.get('cookie'), '_fbp'), fbc = cookie(h.get('cookie'), '_fbc');
  return {
    ip, ua: h.get('user-agent') || null,
    fbp: fbp && COOKIE.test(fbp) ? fbp : null,
    fbc: fbc && COOKIE.test(fbc) ? fbc : null,
    // Visitors who opted out (Global Privacy Control) are not sent.
    gpc: h.get('sec-gpc') === '1',
  };
}

// One event in the shape Meta expects. source: 'website' (needs the visitor's browser) or 'system_generated' (renewals).
export function metaEvent({ name, id, email, url, v, custom, source = 'website', time = Date.now() }) {
  const user = {};
  if (email) user.em = [sha(email)];
  if (v && v.ip) user.client_ip_address = v.ip;
  if (v && v.ua) user.client_user_agent = v.ua;
  if (v && v.fbp) user.fbp = v.fbp;
  if (v && v.fbc) user.fbc = v.fbc;
  const e = { event_name: name, event_time: Math.floor(time / 1000), action_source: source, user_data: user };
  if (id) e.event_id = String(id).slice(0, 100);
  if (url) e.event_source_url = url;
  if (custom) e.custom_data = custom;
  return e;
}

// Sends events. Never throws: ads tracking must not break a sign-up or a webhook.
export async function sendMeta(events) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return { skipped: 'no token' };
  const list = (Array.isArray(events) ? events : [events]).filter(Boolean);
  if (!list.length) return { skipped: 'nothing to send' };
  const body = { data: list };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 3000);
  try {
    const r = await fetch(`https://graph.facebook.com/${VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl.signal,
    });
    if (!r.ok) { console.error('meta capi', r.status, (await r.text()).slice(0, 300)); return { error: r.status }; }
    return { ok: list.length };
  } catch (err) {
    console.error('meta capi', err.message);
    return { error: err.message };
  } finally {
    clearTimeout(timer);
  }
}
