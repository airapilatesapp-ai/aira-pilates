// Offline test for the quiz contacts: /api/lead, the hourly follow-ups and unsubscribe.
// Fake Supabase + fake Resend; no network. Run: node scripts/test-leads.mjs
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

Object.assign(process.env, { SUPABASE_URL: 'https://fake.supabase.co', SUPABASE_SECRET_KEY: 'sb_secret_x', RESEND_API_KEY: 're_x', CRON_SECRET: 'cron123', APP_URL: 'https://airapilates.app', COMPANY_ADDRESS: '123 Test St, Goiânia, GO, Brazil' });
const db = { leads: [], subscribers: [] }, mails = [];
let clock = Date.now();
const realNow = Date.now; Date.now = () => clock;
const J = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });
const filt = (rows, q) => rows.filter((r) => [...q.entries()].every(([k, v]) => {
  if (['order', 'limit', 'select', 'on_conflict'].includes(k)) return true;
  const [op, ...rest] = v.split('.'); const val = rest.join('.');
  if (op === 'eq') return String(r[k]) === val;
  if (op === 'lt') return Number(r[k]) < Number(val);
  if (op === 'lte') return r[k] != null && new Date(r[k]) <= new Date(val);
  if (op === 'is') return val === 'null' ? r[k] == null : String(!!r[k]) === val;
  if (op === 'in') return val.slice(1, -1).split(',').includes(r[k]);
  return true;
}));
globalThis.fetch = async (url, init = {}) => {
  const u = new URL(String(url));
  if (u.host === 'api.resend.com') { mails.push(JSON.parse(init.body)); return J(200, { id: 'm' + mails.length }); }
  const table = u.pathname.split('/').pop(); const rows = db[table]; const m = init.method || 'GET';
  if (m === 'GET') { const r = filt(rows, u.searchParams); return J(200, r.slice(0, Number(u.searchParams.get('limit') || 99))); }
  const body = JSON.parse(init.body || '{}');
  if (m === 'POST') { let r = rows.find((x) => x.email === body.email); if (r) Object.assign(r, body); else { r = { token: randomUUID(), emails_sent: 0, next_email_at: null, converted_at: null, unsubscribed: false, created_at: new Date(clock).toISOString(), ...body }; rows.push(r); } return J(201, [r]); }
  if (m === 'PATCH') { const r = filt(rows, u.searchParams); r.forEach((x) => Object.assign(x, body)); return J(200, r); }
};
const lead = await import('../api/lead.js'), cron = await import('../api/cron-leads.js'), unsub = await import('../api/unsubscribe.js');
const post = (b) => lead.POST(new Request('https://airapilates.app/api/lead', { method: 'POST', body: JSON.stringify(b) }));
const runCron = (auth = 'Bearer cron123') => cron.GET(new Request('https://airapilates.app/api/cron-leads', { headers: { authorization: auth } }));
const H = 3600e3;

// 1. New lead gets e-mail 0 with her plan, answers are cleaned.
let r = await post({ email: ' Jane@Example.com ', name: 'Jane Doe', lang: 'en', src: 'reel12', answers: { goal: 'core', age: '30-39', areas: ['belly', 'hack'], level: '1', time: 15, days: 3, pains: ['back'], plan: ['fundamentos', 'costas', 'nope', 'abdIni'], evil: '<x>' } });
assert.equal(r.status, 200); const { token } = await r.json();
const L = db.leads[0];
assert.equal(L.email, 'jane@example.com'); assert.deepEqual(L.answers, { goal: 'core', age: '30-39', level: 1, days: 3, time: 15, areas: ['belly'], plan: ['fundamentos', 'costas', 'abdIni'] });
assert.equal(mails.length, 1); assert.match(mails[0].subject, /^Jane, your Pilates plan is ready$/);
assert.match(mails[0].html, /Pilates Fundamentals[\s\S]*Back Pain Relief[\s\S]*Abs for Beginners/); assert.match(mails[0].html, new RegExp(`start\\?l=${token}&amp;src=email0|start\\?l=${token}&src=email0`));
assert.match(mails[0].html, /123 Test St/); assert.ok(mails[0].headers['List-Unsubscribe'].includes(token));
assert.equal(L.emails_sent, 1); console.log('1 ok: plan e-mail sent:', mails[0].subject);

// 2. Retake doesn't re-send; GET by token returns the plan.
await post({ email: 'jane@example.com', name: 'Jane', lang: 'en', answers: { goal: 'gluteos', level: 2, time: 20 } });
assert.equal(mails.length, 1); assert.equal(L.answers.goal, 'gluteos');
r = await lead.GET(new Request(`https://airapilates.app/api/lead?t=${token}`)); const g = await r.json();
assert.equal(g.email, 'jane@example.com'); assert.equal(g.answers.goal, 'gluteos');
assert.equal((await lead.GET(new Request('https://airapilates.app/api/lead?t=nope'))).status, 404); console.log('2 ok: retake + resume link');

// 3. Cron: wrong secret refused; nothing due yet; after 24h e-mail 1; after 48h more e-mail 2; then done.
assert.equal((await runCron('Bearer wrong')).status, 401);
assert.deepEqual(await (await runCron()).json(), { sent: 0, converted: 0, failed: 0 });
clock += 24 * H + 60e3; await runCron(); assert.equal(mails.length, 2); assert.match(mails[1].subject, /still waiting, Jane/);
clock += 48 * H + 60e3; await runCron(); assert.equal(mails.length, 3); assert.match(mails[2].subject, /holding you back/);
clock += 200 * H; await runCron(); assert.equal(mails.length, 3); assert.equal(L.next_email_at, null); console.log('3 ok: follow-ups at +24h and +72h, then stop');

// 4. PT lead who starts the trial: no follow-ups.
await post({ email: 'ana@exemplo.com', name: 'Ana', lang: 'pt', answers: { goal: 'postura', level: 1, time: 10, days: 2 } });
assert.match(mails.at(-1).subject, /^Ana, seu plano de Pilates está pronto$/); assert.match(mails.at(-1).html, /Postura no trabalho|Fundamentos do Pilates/);
db.subscribers.push({ email: 'ana@exemplo.com', status: 'trialing' });
const before = mails.length; clock += 25 * H; const rep = await (await runCron()).json();
assert.equal(mails.length, before); assert.equal(rep.converted, 1); assert.ok(db.leads[1].converted_at); console.log('4 ok: PT e-mail + stop after trial');

// 5. Existing member who retakes the quiz gets no e-mail and is told she's a member.
r = await post({ email: 'ana@exemplo.com', lang: 'pt', answers: {} }); assert.equal((await r.json()).member, true); assert.equal(mails.length, before);
// 6. Unsubscribe: GET shows a button and changes nothing; POST stops e-mails.
await post({ email: 'bea@example.com', lang: 'en', answers: { goal: 'flex' } });
const B = db.leads[2]; let page = await (await unsub.GET(new Request(`https://airapilates.app/api/unsubscribe?t=${B.token}`))).text();
assert.match(page, /<form method="post"/); assert.equal(B.unsubscribed, false);
await unsub.POST(new Request(`https://airapilates.app/api/unsubscribe?t=${B.token}`, { method: 'POST' }));
assert.equal(B.unsubscribed, true); const n6 = mails.length; clock += 30 * H; await runCron(); assert.equal(mails.length, n6); console.log('6 ok: unsubscribe');
// 7. Bad input.
assert.equal((await post({ email: 'not-an-email' })).status, 400);
// 8. Resend down on e-mail 0: retried by the next hourly run.
const realFetch = globalThis.fetch; globalThis.fetch = async (u, i) => String(u).includes('resend') ? J(500, { message: 'down' }) : realFetch(u, i);
await post({ email: 'cara@example.com', name: 'Cara', lang: 'en', answers: { goal: 'core' } });
globalThis.fetch = realFetch; const C = db.leads[3]; assert.equal(C.emails_sent, 0);
clock += 2 * H; await runCron(); assert.equal(C.emails_sent, 1); assert.match(mails.at(-1).subject, /Cara, your Pilates plan is ready/); console.log('8 ok: retry after Resend failure');
Date.now = realNow;
console.log('All lead tests passed.');
