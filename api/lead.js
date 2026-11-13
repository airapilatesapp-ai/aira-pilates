// Quiz contacts. POST: saves her answers and e-mails her plan. GET ?t=token: returns the plan (for links in e-mails).
import { saveLead, getLead, leadByToken, updateLead, isMember } from '../lib/supabase.js';
import { sendMail } from '../lib/mail.js';
import { leadEmail, FOLLOW_UP_HOURS } from '../lib/lead-emails.js';
import { CLASSES } from '../lib/classes.js';

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const appUrl = (req) => (process.env.APP_URL || new URL(req.url).origin).replace(/\/+$/, '');
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
const hoursFromNow = (h) => new Date(Date.now() + h * 3600e3).toISOString();

// Keep only the quiz answers we know, in a safe shape.
const ONE = { goal: ['corpo', 'core', 'gluteos', 'postura', 'flex'], age: ['18-29', '30-39', '40-49', '50+'], level: [1, 2, 3], days: [2, 3, 4, 5], time: [10, 15, 20, 30], obstacle: ['time', 'motivation', 'start', 'pain', 'boring'] };
// Discomfort answers stay in her browser (they only pick gentler classes); we keep the resulting class list instead.
const MANY = { areas: ['belly', 'glutes', 'legs', 'arms', 'back', 'whole'], feel: ['strong', 'energy', 'painfree', 'confident', 'calm'] };
export function cleanAnswers(a) {
  const out = {};
  if (!a || typeof a !== 'object') return out;
  for (const [k, ok] of Object.entries(ONE)) { const v = typeof ok[0] === 'number' ? Number(a[k]) : a[k]; if (ok.includes(v)) out[k] = v; }
  for (const [k, ok] of Object.entries(MANY)) if (Array.isArray(a[k])) { const v = [...new Set(a[k].filter((x) => ok.includes(x)))]; if (v.length) out[k] = v; }
  if (Array.isArray(a.plan)) { const v = [...new Set(a.plan.filter((x) => typeof x === 'string' && CLASSES[x]))].slice(0, 5); if (v.length) out.plan = v; }
  return out;
}

export async function POST(request) {
  let b;
  try { b = await request.json(); } catch { return json(400, { error: 'bad_json' }); }
  const email = String(b.email || '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 200) return json(400, { error: 'bad_email' });
  const row = {
    email,
    name: String(b.name || '').trim().slice(0, 40) || null,
    lang: b.lang === 'pt' ? 'pt' : 'en',
    answers: cleanAnswers(b.answers),
    src: String(b.src || '').replace(/[^\w-]/g, '').slice(0, 40) || null,
  };
  try {
    const before = await getLead(email);
    const member = await isMember(email);
    let lead = await saveLead(row);
    if (member) {
      if (!lead.converted_at) await updateLead(email, { converted_at: new Date().toISOString(), next_email_at: null });
      return json(200, { token: lead.token, member: true });
    }
    // First time: e-mail her plan now and schedule the follow-ups. Retakes don't re-send.
    if (!before || (!before.emails_sent && !before.unsubscribed)) {
      try {
        const m = leadEmail(0, lead, appUrl(request));
        await sendMail({ to: email, ...m });
        await updateLead(email, { emails_sent: 1, next_email_at: hoursFromNow(FOLLOW_UP_HOURS[0]) });
      } catch (err) {
        console.error('lead e-mail 0', err);
        // Try again on the next hourly run.
        await updateLead(email, { next_email_at: new Date().toISOString() });
      }
    }
    return json(200, { token: lead.token });
  } catch (err) {
    console.error('lead', err);
    return json(500, { error: 'save_failed' });
  }
}

export async function GET(request) {
  const t = new URL(request.url).searchParams.get('t') || '';
  try {
    const lead = await leadByToken(t);
    if (!lead) return json(404, { error: 'not_found' });
    return json(200, { email: lead.email, name: lead.name, lang: lead.lang, answers: lead.answers || {} });
  } catch (err) {
    console.error('lead get', err);
    return json(500, { error: 'failed' });
  }
}
