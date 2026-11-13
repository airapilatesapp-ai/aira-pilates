// Unsubscribe link in the quiz e-mails. GET shows a confirm button (so link scanners can't
// unsubscribe people by accident); POST does it, which also covers one-click unsubscribe in Gmail.
import { leadByToken, updateLead } from '../lib/supabase.js';

const page = (title, text, form) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Aira</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F6F3F8;font:16px/1.5 Helvetica,Arial,sans-serif;color:#2B2233;padding:16px;box-sizing:border-box}main{max-width:420px;background:#fff;border-radius:24px;padding:30px 26px;text-align:center}h1{font-size:22px;margin:14px 0 8px}p{margin:0 0 18px;color:#5E5468}button{border:0;border-radius:999px;background:#5B3F7A;color:#fff;font:600 16px Helvetica,Arial,sans-serif;padding:14px 26px;cursor:pointer}a{color:#5B3F7A}</style></head>
<body><main><img src="/assets/icon-192.png" width="56" height="56" alt="Aira" style="border-radius:14px"><h1>${title}</h1><p>${text}</p>${form || '<a href="/">airapilates.app</a>'}</main></body></html>`,
  { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });

export async function GET(request) {
  const t = new URL(request.url).searchParams.get('t') || '';
  const lead = await leadByToken(t).catch(() => null);
  if (!lead) return page('Link not found', 'This unsubscribe link is not valid anymore.');
  if (lead.unsubscribed) return page('You are unsubscribed', 'You won\'t get any more e-mails about your quiz plan.');
  return page('Unsubscribe?', `Stop e-mails about your Aira plan to <b>${lead.email.replace(/[<>&"]/g, '')}</b>.`,
    `<form method="post" action="/api/unsubscribe?t=${encodeURIComponent(t)}"><button type="submit">Unsubscribe</button></form>`);
}

export async function POST(request) {
  const t = new URL(request.url).searchParams.get('t') || '';
  const lead = await leadByToken(t).catch(() => null);
  if (lead) await updateLead(lead.email, { unsubscribed: true, next_email_at: null }).catch((e) => console.error('unsubscribe', e));
  return page('You are unsubscribed', 'You won\'t get any more e-mails about your quiz plan. Your app account (if you have one) is not affected.');
}
