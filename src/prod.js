/* ================= Production layer =================
   Runs after the app code above. Adds: login check, subscription check, real progress
   (saved on the phone and in Supabase), account card, payment warning and the install guide. */

const PX = {
  pt: {
    acct:'Conta', email:'E-mail', plan:'Plano', status:'Situação', monthly:'Mensal', yearly:'Anual',
    trial:'Teste grátis até {d}', active:'Ativa · renova em {d}', ending:'Termina em {d}', pastDue:'Problema no pagamento',
    manage:'Gerenciar assinatura', signout:'Sair da conta', opening:'Abrindo…', portalErr:'Não deu para abrir agora. Tente de novo em instantes ou escreva para {m}.',
    payH:'Seu último pagamento não passou.', payP:'Atualize o cartão para continuar com acesso às aulas.', payA:'Atualizar cartão',
    pwH:'Sua assinatura não está ativa', pwNone:'Não encontramos uma assinatura para {e}.', pwEnded:'Sua assinatura terminou. Volte quando quiser: seu progresso continua salvo.',
    pwPlans:'Ver planos', pwOther:'Entrar com outro e-mail',
    cfg:'O app ainda não está configurado. Tente de novo mais tarde.', net:'Sem internet. Conecte-se e tente de novo.', retry:'Tentar de novo',
    instH:'Coloque a Aira na tela inicial', instP:'Assim ela abre como um app, em tela cheia, com um toque. Na primeira vez que abrir pelo ícone, digite seu e-mail e o código de 6 números que chega por e-mail.',
    instIos1:'Toque no botão <b>Compartilhar</b> na barra do Safari', instIos2:'Role e toque em <b>Adicionar à Tela de Início</b>', instIos3:'Toque em <b>Adicionar</b>',
    instIosSafari:'No iPhone, abra este link no <b>Safari</b> para instalar.',
    instBtn:'Instalar a Aira', instDesk:'No computador, clique no ícone de instalar na barra de endereço do navegador.', later:'Agora não', done:'Pronto'
  },
  en: {
    acct:'Account', email:'E-mail', plan:'Plan', status:'Status', monthly:'Monthly', yearly:'Yearly',
    trial:'Free trial until {d}', active:'Active · renews {d}', ending:'Ends {d}', pastDue:'Payment problem',
    manage:'Manage subscription', signout:'Sign out', opening:'Opening…', portalErr:"We couldn't open it right now. Try again in a moment or write to {m}.",
    payH:"Your last payment didn't go through.", payP:'Update your card to keep access to your classes.', payA:'Update card',
    pwH:"Your membership isn't active", pwNone:"We couldn't find a membership for {e}.", pwEnded:'Your membership has ended. Come back any time: your progress is saved.',
    pwPlans:'See plans', pwOther:'Use another e-mail',
    cfg:"The app isn't set up yet. Please try again later.", net:"You're offline. Connect to the internet and try again.", retry:'Try again',
    instH:'Add Aira to your home screen', instP:'It opens like an app, full screen, in one tap. The first time you open it from the icon, enter your e-mail and the 6-digit code we send you.',
    instIos1:'Tap the <b>Share</b> button in the Safari bar', instIos2:'Scroll and tap <b>Add to Home Screen</b>', instIos3:'Tap <b>Add</b>',
    instIosSafari:'On iPhone, open this link in <b>Safari</b> to install.',
    instBtn:'Install Aira', instDesk:'On a computer, click the install icon in your browser\'s address bar.', later:'Not now', done:'Done'
  }
};
const px = (k, v) => { let s = (PX[S.lang] || PX.en)[k] || ''; if (v) Object.keys(v).forEach((x) => { s = s.replace('{' + x + '}', v[x]); }); return s; };
const ALLOWED = ['trialing', 'active', 'past_due'];
const KEEP = ['lang','name','goals','level','time','favs','voice','log','sessions','onboarded','installSeen'];
const ACC = { sb:null, user:null, sub:null, cfg:{}, promptEvt:null,
  standalone: (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true };
const ymd = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const fmtDay = (iso) => iso ? new Date(iso).toLocaleDateString(t('loc'), { month:'short', day:'numeric' }) : '';

/* ---------- Real progress instead of the demo numbers ---------- */
function prodFresh(){
  const s = fresh(Aira.lang());
  return Object.assign(s, { name:'', streak:0, best:0, sessions:0, todayDone:false, todayMinutes:0, log:{}, onboarded:false, installSeen:false, screen:'home' });
}
isDone = function(d){ return !!(S.log || {})[ymd(d)]; };
function monthMinutes(){ const p = ymd(today).slice(0, 7); let m = 0; Object.keys(S.log || {}).forEach((k) => { if (k.slice(0, 7) === p) m += S.log[k]; }); return m; }
function computeStats(){
  const log = S.log || {};
  S.todayDone = !!log[ymd(today)]; S.todayMinutes = log[ymd(today)] || 0;
  let n = 0; const d = new Date(today); if (!S.todayDone) d.setDate(d.getDate() - 1);
  while (log[ymd(d)]) { n++; d.setDate(d.getDate() - 1); }
  S.streak = n;
  let best = 0, run = 0, prev = null;
  Object.keys(log).sort().forEach((k) => { const cur = new Date(k + 'T12:00:00'); run = (prev && Math.round((cur - prev) / DAY) === 1) ? run + 1 : 1; best = Math.max(best, run); prev = cur; });
  S.best = Math.max(best, n);
}
finish = function(){
  stopPlayer();
  const m = Math.max(1, Math.round(PL.total / 60)), k = ymd(new Date());
  S.log = S.log || {}; S.log[k] = (S.log[k] || 0) + m;
  S.sessions += 1; S.mood = null; computeStats();
  S.result = { min:m, poses:PL.nEx };
  if (!ACC.standalone && !S.installSeen) S.showInstall = true;
  S.screen = 'done'; render(false);
  speak(t('v.done', { name:S.name || t('d.you'), n:PL.nEx }));
};

/* ---------- Saving: on the phone right away, in Supabase a moment later ---------- */
let lastSnap = '', saveTimer = null;
const localKey = () => 'aira.state.' + (ACC.user ? ACC.user.id : 'guest');
function snapshot(){ const o = {}; KEEP.forEach((k) => { o[k] = S[k]; }); return o; }
function persist(){
  if (!ACC.user) return;
  const snap = snapshot(), str = JSON.stringify(snap);
  if (str === lastSnap) return;
  lastSnap = str; snap.updated = Date.now();
  Aira.store.set(localKey(), JSON.stringify(snap));
  clearTimeout(saveTimer); saveTimer = setTimeout(() => pushRemote(snap), 2000);
}
function pushRemote(snap){
  if (!ACC.sb || !ACC.user) return;
  ACC.sb.from('progress').upsert({ user_id:ACC.user.id, data:snap || JSON.parse(Aira.store.get(localKey()) || '{}'), updated_at:new Date().toISOString() }).then(() => {}, () => {});
}
async function loadProgress(){
  let local = null, remote = null;
  try { local = JSON.parse(Aira.store.get(localKey()) || 'null'); } catch (e) {}
  try { const r = await ACC.sb.from('progress').select('data').eq('user_id', ACC.user.id).maybeSingle(); remote = r.data && r.data.data; } catch (e) {}
  const pick = !local ? remote : !remote ? local : ((remote.updated || 0) > (local.updated || 0) ? remote : local);
  const s = prodFresh();
  if (pick) KEEP.forEach((k) => { if (pick[k] !== undefined && pick[k] !== null) s[k] = pick[k]; });
  if (local && remote) {
    const a = local.log || {}, b = remote.log || {}; s.log = Object.assign({}, b);
    Object.keys(a).forEach((k) => { s.log[k] = Math.max(s.log[k] || 0, a[k]); });
    s.sessions = Math.max(local.sessions || 0, remote.sessions || 0);
  }
  if (!pick) {
    const ul = ACC.user.user_metadata && ACC.user.user_metadata.lang;
    if (!Aira.store.get('aira.lang') && (ul === 'pt' || ul === 'en')) s.lang = ul;
    try { const q = JSON.parse(Aira.store.get('aira.quiz') || 'null'); if (q) { const gs = (q.goals || [q.goal]).filter((g) => GOALS.some((x) => x.id === g)); if (gs.length) s.goals = gs; if (q.level) s.level = Number(q.level); if (q.time) s.time = Number(q.time); if (q.name && !s.name) s.name = String(q.name).slice(0, 20); } } catch (e) {}
  }
  return s;
}

/* ---------- Screens added or adjusted for the real app ---------- */
const portalUrl = () => ACC.cfg.portalLink ? ACC.cfg.portalLink + (ACC.cfg.portalLink.indexOf('?') === -1 ? '?' : '&') + 'prefilled_email=' + encodeURIComponent(ACC.user ? ACC.user.email : '') : '';
function subLine(){
  const s = ACC.sub; if (!s) return '';
  if (s.status === 'past_due' || s.status === 'unpaid') return px('pastDue');
  if (s.status === 'trialing') return px('trial', { d:fmtDay(s.trial_end || s.current_period_end) });
  if (s.cancel_at_period_end) return px('ending', { d:fmtDay(s.current_period_end) });
  return px('active', { d:fmtDay(s.current_period_end) });
}
function accountCard(){
  const s = ACC.sub || {};
  return `<section class="card progcard acct">
    <div class="sechead"><span class="eyebrow">${px('acct')}</span><span style="color:var(--plum)">${I.logo}</span></div>
    <div class="row"><span>${px('email')}</span><span>${esc(ACC.user ? ACC.user.email : '')}</span></div>
    ${s.plan ? `<div class="row"><span>${px('plan')}</span><span>${px(s.plan === 'yearly' ? 'yearly' : 'monthly')}</span></div>` : ''}
    ${s.status ? `<div class="row"><span>${px('status')}</span><span>${subLine()}</span></div>` : ''}
    ${ACC.sub ? `<button type="button" class="btn line" data-act="portal">${px('manage')}</button>` : ''}
    <button type="button" class="link" data-act="signout" style="align-self:flex-start">${px('signout')}</button>
  </section>`;
}
function payBanner(){
  if (!ACC.sub || (ACC.sub.status !== 'past_due' && ACC.sub.status !== 'unpaid')) return '';
  return `<div class="banner" role="alert"><span>⚠</span><span><b>${px('payH')}</b> ${px('payP')} <button type="button" data-act="portal" style="display:inline;min-height:0;border:none;background:none;padding:0;font:inherit;font-weight:600;color:var(--plum);text-decoration:underline;cursor:pointer">${px('payA')}</button></span></div>`;
}
function installSheet(){
  const ua = navigator.userAgent || '', ios = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && 'ontouchend' in document);
  const safari = ios && !/crios|fxios|edgios|gsa\//i.test(ua);
  const share = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2F6FDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/></svg>';
  const plus = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#231A2C" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/></svg>';
  let body;
  if (ios && safari) body = `<ol><li><span class="n">1</span>${share}<span>${px('instIos1')}</span></li><li><span class="n">2</span>${plus}<span>${px('instIos2')}</span></li><li><span class="n">3</span><span>${px('instIos3')}</span></li></ol>`;
  else if (ios) body = `<p class="small" style="margin:0">${px('instIosSafari')}</p>`;
  else if (ACC.promptEvt) body = `<button type="button" class="btn" data-act="inst-go">${px('instBtn')}</button>`;
  else body = `<p class="small" style="margin:0">${px('instDesk')}</p>`;
  return `<div class="overlay" data-act="inst-close"><div class="sheet inst" role="dialog" aria-modal="true" aria-labelledby="instT">
    <div style="display:flex;gap:14px;align-items:center"><img src="/assets/icon-192.png" alt="" width="56" height="56" style="border-radius:14px"><h2 id="instT" style="margin:0;font-family:var(--font-display);font-size:21px">${px('instH')}</h2></div>
    <p class="small" style="margin:0">${px('instP')}</p>${body}
    <button type="button" class="btn line" data-act="inst-close">${ios && safari ? px('done') : px('later')}</button></div></div>`;
}
function vPaywall(){
  const s = ACC.sub, email = ACC.user ? ACC.user.email : '';
  return `<div class="screen"><div class="scroll"><div class="pad" style="padding-top:72px;gap:18px;align-items:flex-start">
    <img src="/assets/icon-192.png" alt="" width="72" height="72" style="border-radius:18px">
    <h1 class="h1">${px('pwH')}</h1>
    <p class="sub">${s ? px('pwEnded') : px('pwNone', { e:esc(email) })}</p>
    <a class="btn" style="text-decoration:none" href="/#plans">${px('pwPlans')}</a>
    ${s ? `<button type="button" class="btn line" data-act="portal">${px('manage')}</button>` : ''}
    <button type="button" class="link" data-act="signout">${px('pwOther')}</button>
  </div></div></div>`;
}
function fatal(msg){
  app.innerHTML = `<div class="splash"><img src="/assets/icon-192.png" alt="Aira"><p class="sub" style="max-width:280px;text-align:center;margin:0">${msg}</p><button type="button" class="btn" style="width:auto;padding:0 28px" onclick="location.reload()">${px('retry')}</button></div>`;
}

VIEWS.paywall = vPaywall;
VIEWS.welcome = () => { S.screen = S.onboarded ? 'home' : 'goals'; return VIEWS[S.screen](); };
const baseGoals = VIEWS.goals, baseHome = VIEWS.home, baseProgress = VIEWS.progress, baseDone = VIEWS.done;
VIEWS.goals = () => baseGoals().replace('class="iconbtn" style="background:transparent" data-go="welcome"', `class="iconbtn" style="background:transparent${S.onboarded ? '' : ';visibility:hidden'}" data-go="home"`);
VIEWS.home = () => {
  let h = baseHome().replace('<div class="scroll"><div class="pad">', '<div class="scroll"><div class="pad">' + payBanner());
  if (S.showInstall) h = h.replace(/<\/div>\s*$/, installSheet() + '</div>');
  return h;
};
VIEWS.done = () => baseDone();
VIEWS.progress = () => baseProgress().replace(/<section class="card remind">[\s\S]*?<\/section>/, accountCard());

/* ---------- Hooks into the app ---------- */
const baseRender = render;
render = function(keep){ baseRender(keep); persist(); };
const baseSetLang = setLang;
setLang = function(l){
  baseSetLang(l); Aira.setLang(l); persist();
  if (ACC.sb) ACC.sb.auth.updateUser({ data:{ lang:l } }).then(() => {}, () => {});
};
// One tap into the Stripe portal (cancel, change plan, update card), already signed in.
async function openPortal(el){
  if (el.disabled) return;
  const label = el.textContent; el.disabled = true; el.textContent = px('opening');
  try {
    const token = (await ACC.sb.auth.getSession()).data.session.access_token;
    const r = await fetch('/api/portal-session', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + token }, body:JSON.stringify({ lang:S.lang }) });
    const d = await r.json();
    if (r.ok && d.url) { Aira.store.del('aira.sub'); location.href = d.url; return; }
    throw new Error(d.error || r.status);
  } catch (e) {
    const pu = portalUrl();
    if (pu) { location.href = pu; return; }
    alertMsg(px('portalErr', { m:esc(ACC.cfg.supportEmail || 'airapilates.app@gmail.com') }));
  }
  el.disabled = false; el.textContent = label;
}
function alertMsg(html){
  let t = document.getElementById('aira-toast');
  if (!t) { t = document.createElement('div'); t.id = 'aira-toast'; t.setAttribute('role', 'status'); t.style.cssText = 'position:fixed;left:16px;right:16px;bottom:calc(24px + env(safe-area-inset-bottom));z-index:99;background:#231A2C;color:#fff;padding:14px 16px;border-radius:14px;font-size:14px;line-height:1.45;box-shadow:0 8px 30px rgba(0,0,0,.2)'; document.body.appendChild(t); }
  t.innerHTML = html; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 6000);
}
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  if (act === 'create') { S.onboarded = true; if (!ACC.standalone && !S.installSeen) S.showInstall = true; }
  if (act === 'inst-close' && (e.target === el || el.tagName === 'BUTTON')) { S.showInstall = false; S.installSeen = true; render(true); }
  if (act === 'inst-go' && ACC.promptEvt) { ACC.promptEvt.prompt(); ACC.promptEvt.userChoice.finally(() => { ACC.promptEvt = null; S.showInstall = false; S.installSeen = true; render(true); }); }
  if (act === 'portal') { openPortal(el); return; }
  if (act === 'signout') { clearTimeout(saveTimer); pushRemote(); Aira.store.del('aira.sub'); ACC.sb.auth.signOut().finally(() => location.replace('/login')); }
}, true);
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); ACC.promptEvt = e; });
window.addEventListener('appinstalled', () => { S.installSeen = true; S.showInstall = false; persist(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && ACC.user) { clearTimeout(saveTimer); pushRemote(); } });

/* ---------- Start: who is this, and has she paid? ---------- */
async function boot(){
  try { ACC.cfg = await Aira.config(); ACC.sb = await Aira.supabase(); }
  catch (e) { return fatal(px('cfg')); }
  const hash = new URLSearchParams(location.hash.slice(1));
  if (hash.get('error') || hash.get('error_code')) { location.replace('/login' + location.hash); return; }
  let session = null;
  try { session = (await ACC.sb.auth.getSession()).data.session; } catch (e) {}
  if (!session) { location.replace('/login'); return; }
  ACC.user = session.user;
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  try {
    const r = await ACC.sb.from('subscribers').select('status,plan,current_period_end,trial_end,cancel_at_period_end').maybeSingle();
    if (r.error) throw r.error;
    ACC.sub = r.data;
    Aira.store.set('aira.sub', JSON.stringify({ sub:r.data, at:Date.now() }));
  } catch (e) {
    let c = null; try { c = JSON.parse(Aira.store.get('aira.sub') || 'null'); } catch (x) {}
    if (c && Date.now() - c.at < 14 * DAY) ACC.sub = c.sub; else return fatal(px('net'));
  }
  S = await loadProgress();
  computeStats();
  lastSnap = JSON.stringify(snapshot());
  S.screen = (!ACC.sub || ALLOWED.indexOf(ACC.sub.status) === -1) ? 'paywall' : (S.onboarded ? 'home' : 'goals');
  if (S.screen === 'home' && !ACC.standalone && !S.installSeen) S.showInstall = true;
  render(false);
  ACC.sb.auth.onAuthStateChange((ev) => { if (ev === 'SIGNED_OUT') location.replace('/login'); });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/app/sw.js', { scope:'/app/' }).catch(() => {});
}
boot();
