// Opens the Stripe customer portal for the signed-in member, with no extra e-mail step.
// The app sends her Supabase access token; we find her Stripe customer and ask Stripe
// for a one-time portal link that returns to the app.
import { stripePost } from '../lib/stripe.js';
import { userFromToken, subscriberByEmail } from '../lib/supabase.js';

const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

export async function POST(request) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const user = await userFromToken(token);
    if (!user || !user.email) return json(401, { error: 'not_signed_in' });
    const row = await subscriberByEmail(user.email);
    if (!row || !row.stripe_customer_id) return json(404, { error: 'no_subscription' });
    const appUrl = (process.env.APP_URL || new URL(request.url).origin).replace(/\/+$/, '');
    let lang = '';
    try { lang = ((await request.json()) || {}).lang || ''; } catch {}
    const params = { customer: row.stripe_customer_id, return_url: appUrl + '/app/' };
    if (lang === 'pt') params.locale = 'pt-BR';
    else if (lang === 'en') params.locale = 'en';
    const session = await stripePost('billing_portal/sessions', params);
    return json(200, { url: session.url });
  } catch (err) {
    console.error('portal-session', err);
    return json(500, { error: 'portal_failed' });
  }
}
