// Used by the welcome page right after payment: tells it which e-mail the access link went to.
import { stripeGet } from '../lib/stripe.js';
import { visitor, metaEvent, sendMeta } from '../lib/meta.js';

const json = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function mask(email) {
  const [user, domain] = String(email).split('@');
  if (!domain) return '';
  const shown = user.length <= 2 ? user[0] : user.slice(0, 2);
  return `${shown}${'•'.repeat(Math.max(2, Math.min(6, user.length - shown.length)))}@${domain}`;
}

export async function GET(request) {
  const q = new URL(request.url).searchParams;
  const id = q.get('session_id') || '';
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(id)) return json(400, { error: 'invalid session' });
  try {
    const s = await stripeGet(`checkout/sessions/${id}`);
    const email = (s.customer_details && s.customer_details.email) || s.customer_email || '';
    // Server copy of the welcome page's StartTrial pixel event, same id so Meta counts it once.
    // Only when her pixel is on (m=1), for a finished checkout from the last two days, so an old link can't count again.
    const v = visitor(request);
    if (s.status === 'complete' && s.mode === 'subscription' && email && q.get('m') === '1' && !v.gpc && s.created * 1000 > Date.now() - 2 * 86400e3) {
      const origin = (process.env.APP_URL || new URL(request.url).origin).replace(/\/+$/, '');
      await sendMeta(metaEvent({ name: 'StartTrial', id: `trial_${id}`, email, url: `${origin}/welcome`, v }));
    }
    return json(200, { email: mask(email), paid: s.status === 'complete', mode: s.mode,
      amount: typeof s.amount_total === 'number' ? s.amount_total / 100 : null, currency: String(s.currency || '').toUpperCase() });
  } catch (err) {
    return json(404, { error: 'session not found' });
  }
}
