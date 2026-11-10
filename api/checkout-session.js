// Used by the welcome page right after payment: tells it which e-mail the access link went to.
import { stripeGet } from '../lib/stripe.js';

const json = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function mask(email) {
  const [user, domain] = String(email).split('@');
  if (!domain) return '';
  const shown = user.length <= 2 ? user[0] : user.slice(0, 2);
  return `${shown}${'•'.repeat(Math.max(2, Math.min(6, user.length - shown.length)))}@${domain}`;
}

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('session_id') || '';
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(id)) return json(400, { error: 'invalid session' });
  try {
    const s = await stripeGet(`checkout/sessions/${id}`);
    const email = (s.customer_details && s.customer_details.email) || s.customer_email || '';
    return json(200, { email: mask(email), paid: s.status === 'complete' });
  } catch (err) {
    return json(404, { error: 'session not found' });
  }
}
