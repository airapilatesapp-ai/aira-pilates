// Small Stripe helpers with no external packages: signature check and API reads.
import crypto from 'node:crypto';

const API = 'https://api.stripe.com/v1/';

// Checks the Stripe-Signature header against the raw request body.
// Throws if the signature is missing, wrong, or older than `tolerance` seconds.
export function verifyStripeSignature(rawBody, header, secret, tolerance = 300) {
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  if (!header) throw new Error('Missing Stripe-Signature header');
  const parts = {};
  for (const item of header.split(',')) {
    const i = item.indexOf('=');
    if (i < 0) continue;
    const k = item.slice(0, i).trim(), v = item.slice(i + 1).trim();
    (parts[k] = parts[k] || []).push(v);
  }
  const t = parts.t && parts.t[0];
  const sigs = parts.v1 || [];
  if (!t || !sigs.length) throw new Error('Malformed Stripe-Signature header');
  const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`, 'utf8').digest('hex');
  const ok = sigs.some((s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
  if (!ok) throw new Error('Signature does not match');
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(t));
  if (age > tolerance) throw new Error('Signature is too old');
  return JSON.parse(rawBody);
}

export async function stripeGet(path) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  const res = await fetch(API + path, { headers: { Authorization: `Bearer ${key}` } });
  const body = await res.json();
  if (!res.ok) throw new Error(`Stripe ${path}: ${res.status} ${body?.error?.message || ''}`);
  return body;
}

// Turns a Stripe subscription into the row we keep in Supabase.
// Works with older and newer Stripe API versions (period end moved to the items in 2025).
export function subscriptionRow(sub) {
  const item = sub.items && sub.items.data && sub.items.data[0];
  const periodEnd = sub.current_period_end || (item && item.current_period_end) || null;
  const interval = item && item.price && item.price.recurring && item.price.recurring.interval;
  return {
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
    stripe_subscription_id: sub.id,
    status: sub.status,
    plan: interval === 'year' ? 'yearly' : interval === 'month' ? 'monthly' : interval || null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    trial_end: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
    cancel_at_period_end: !!sub.cancel_at_period_end,
  };
}
