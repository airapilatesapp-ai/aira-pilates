// Stripe calls this address every time something happens with a payment or subscription.
// It keeps the "subscribers" table in Supabase up to date and e-mails the access link after checkout.
import { verifyStripeSignature, stripeGet, subscriptionRow } from '../lib/stripe.js';
import { upsertSubscriber, updateByCustomer, ensureUser, sendAccessLink, updateLead } from '../lib/supabase.js';

const json = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
const appUrl = () => (process.env.APP_URL || '').replace(/\/+$/, '');

async function emailForCustomer(customerId) {
  const c = await stripeGet(`customers/${customerId}`);
  return c && !c.deleted ? c.email : null;
}

async function syncSubscription(sub) {
  const row = subscriptionRow(sub);
  const updated = await updateByCustomer(row.stripe_customer_id, row);
  if (updated.length) return updated[0];
  const email = await emailForCustomer(row.stripe_customer_id);
  if (!email) return null;
  return upsertSubscriber({ email, ...row });
}

export async function handleEvent(event) {
  const obj = event.data && event.data.object;
  switch (event.type) {
    case 'checkout.session.completed': {
      if (obj.mode !== 'subscription' || !obj.subscription) return { skipped: 'not a subscription checkout' };
      const email = (obj.customer_details && obj.customer_details.email) || obj.customer_email;
      if (!email) return { skipped: 'no email on session' };
      const subId = typeof obj.subscription === 'string' ? obj.subscription : obj.subscription.id;
      const sub = await stripeGet(`subscriptions/${subId}`);
      const lang = /^pt/i.test(obj.locale || '') ? 'pt' : 'en';
      await upsertSubscriber({ email, ...subscriptionRow(sub) });
      await ensureUser(email, lang);
      await sendAccessLink(email, appUrl() ? `${appUrl()}/app/` : undefined);
      // Stop the quiz follow-up e-mails. Never fail the webhook because of this.
      try { await updateLead(email, { converted_at: new Date().toISOString(), next_email_at: null }); } catch (err) { console.error('lead converted', err); }
      return { ok: 'access sent' };
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      await syncSubscription(obj);
      return { ok: `status ${obj.status}` };
    }
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed': {
      const subId = obj.subscription || (obj.parent && obj.parent.subscription_details && obj.parent.subscription_details.subscription);
      if (!subId) return { skipped: 'invoice without subscription' };
      const sub = await stripeGet(`subscriptions/${typeof subId === 'string' ? subId : subId.id}`);
      await syncSubscription(sub);
      return { ok: `invoice ${event.type.split('.').pop()}` };
    }
    default:
      return { skipped: event.type };
  }
}

export async function POST(request) {
  const raw = await request.text();
  let event;
  try {
    event = verifyStripeSignature(raw, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return json(400, { error: `Webhook signature check failed: ${err.message}` });
  }
  try {
    const result = await handleEvent(event);
    return json(200, { received: true, ...result });
  } catch (err) {
    console.error('webhook error', event.type, err);
    // 500 makes Stripe retry later, so a temporary failure does not lose a customer.
    return json(500, { error: err.message });
  }
}

export function GET() {
  return json(200, { ok: true, hint: 'This address only accepts POST requests from Stripe.' });
}
