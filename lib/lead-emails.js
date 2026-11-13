// The 3 e-mails a quiz contact gets if she does not start her free trial:
// 0 = right away (her plan), 1 = one day later, 2 = three days later (last one).
import { QUIZ_LABELS, CLASSES, firstWeek } from './classes.js';

export const FOLLOW_UP_HOURS = [24, 48]; // wait after e-mail 0, then after e-mail 1

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const T = {
  en: {
    s0: (n) => n ? `${n}, your Pilates plan is ready` : 'Your Pilates plan is ready',
    s1: (n) => n ? `Your plan is still waiting, ${n}` : 'Your plan is still waiting',
    s2: () => 'Is something holding you back?',
    hi: (n) => n ? `Hi ${n},` : 'Hi there,',
    p0: 'Here is the plan you built with the Aira quiz. Save this e-mail: the button below takes you back to it anytime.',
    goal: 'Goal', focus: 'Focus', level: 'Level', time: 'Time', days: 'Days per week', perDay: (m) => `${m} min a day`,
    week: 'Your first week', min: 'min',
    free: 'Your first 7 days are free. You can cancel in the app in two taps, and you won\'t be charged if you cancel before day 8.',
    cta0: 'See my plan and start free',
    p1a: (g, m) => `Yesterday you built your Aira plan: <b>${g}</b>, in <b>${m} minutes a day</b>. It's ready whenever you are.`,
    p1b: 'How your free week works:',
    tl: ['<b>Today:</b> full access to every class. You pay $0.', '<b>Any day this week:</b> cancel in the app in two taps and pay nothing.', '<b>In 7 days:</b> your plan starts. Cancel anytime.'],
    tip: 'A tip from Nora: don\'t wait for the perfect week. One 10-minute class is a great start.',
    cta1: 'Start my 7 free days',
    p2a: 'If something is holding you back, it\'s usually one of these:',
    obj: [
      ['"I don\'t have time."', 'Classes start at 10 minutes and you can do them at home, with no equipment.'],
      ['"I\'m a beginner."', 'Every move has an animation and a voice that counts and cues your breath. Beginner classes start with the basics.'],
      ['"I don\'t want to get stuck paying."', 'Cancel in the app in two taps. If you cancel during the 7 free days, you pay nothing.'],
    ],
    p2b: 'This is the last e-mail we\'ll send about your plan. It will be here if you change your mind.',
    cta2: 'Start my free week',
    bye: 'With you on the mat,<br>The Aira team',
    why: 'You\'re getting this because you took the Aira quiz at airapilates.app.',
    unsub: 'Unsubscribe',
    health: 'Aira is general fitness content, not medical advice. If you have pain or an injury, check with your doctor first.',
  },
  pt: {
    s0: (n) => n ? `${n}, seu plano de Pilates está pronto` : 'Seu plano de Pilates está pronto',
    s1: (n) => n ? `Seu plano ainda está te esperando, ${n}` : 'Seu plano ainda está te esperando',
    s2: () => 'Tem algo te impedindo de começar?',
    hi: (n) => n ? `Oi, ${n}!` : 'Oi!',
    p0: 'Aqui está o plano que você montou no quiz da Aira. Guarde este e-mail: o botão abaixo te leva de volta a ele quando quiser.',
    goal: 'Objetivo', focus: 'Foco', level: 'Nível', time: 'Tempo', days: 'Dias por semana', perDay: (m) => `${m} min por dia`,
    week: 'Sua primeira semana', min: 'min',
    free: 'Os primeiros 7 dias são grátis. Você cancela no app em dois toques e não paga nada se cancelar antes do 8º dia.',
    cta0: 'Ver meu plano e começar grátis',
    p1a: (g, m) => `Ontem você montou seu plano na Aira: <b>${g}</b>, em <b>${m} minutos por dia</b>. Ele está pronto quando você quiser.`,
    p1b: 'Como funciona a sua semana grátis:',
    tl: ['<b>Hoje:</b> acesso a todas as aulas. Você paga US$ 0.', '<b>Qualquer dia da semana:</b> cancele no app em dois toques e não pague nada.', '<b>Daqui a 7 dias:</b> seu plano começa. Cancele quando quiser.'],
    tip: 'Dica da Nora: não espere a semana perfeita. Uma aula de 10 minutos já é um ótimo começo.',
    cta1: 'Começar meus 7 dias grátis',
    p2a: 'Se algo está te segurando, normalmente é uma destas coisas:',
    obj: [
      ['"Não tenho tempo."', 'As aulas começam com 10 minutos e você faz em casa, sem equipamento.'],
      ['"Sou iniciante."', 'Cada exercício tem uma animação e uma voz que conta e lembra a respiração. As aulas para iniciantes começam pelo básico.'],
      ['"Não quero ficar presa pagando."', 'Você cancela no app em dois toques. Se cancelar durante os 7 dias grátis, não paga nada.'],
    ],
    p2b: 'Este é o último e-mail que vamos mandar sobre o seu plano. Ele continua aqui se você mudar de ideia.',
    cta2: 'Começar minha semana grátis',
    bye: 'Junto com você no tapete,<br>Equipe Aira',
    why: 'Você está recebendo este e-mail porque fez o quiz da Aira em airapilates.app.',
    unsub: 'Cancelar inscrição',
    health: 'A Aira é conteúdo geral de exercício, não orientação médica. Se você tem dor ou lesão, fale com seu médico antes.',
  },
};

const btn = (href, label) => `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 8px"><tr><td style="border-radius:999px;background:#5B3F7A"><a href="${href}" style="display:inline-block;padding:15px 28px;font:600 16px/1 Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none;border-radius:999px">${label}</a></td></tr></table>`;

function shell(body, d, unsubUrl) {
  const addr = process.env.COMPANY_ADDRESS ? ` · ${esc(process.env.COMPANY_ADDRESS)}` : '';
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F6F3F8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3F8"><tr><td align="center" style="padding:28px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:24px">
<tr><td style="padding:30px 28px 8px"><img src="https://airapilates.app/assets/icon-192.png" width="52" height="52" alt="Aira" style="border-radius:14px;display:block"></td></tr>
<tr><td style="padding:8px 28px 30px;font:16px/1.6 Helvetica,Arial,sans-serif;color:#2B2233">${body}
<p style="margin:26px 0 0">${d.bye}</p></td></tr></table>
<p style="max-width:520px;margin:18px auto 0;font:12px/1.6 Helvetica,Arial,sans-serif;color:#8A7F94;text-align:center">${d.health}<br>${d.why}<br><a href="${unsubUrl}" style="color:#8A7F94">${d.unsub}</a> · Aira Pilates${addr}</p>
</td></tr></table></body></html>`;
}

const toText = (html) => html
  .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|tr|li|h\d)>/gi, '\n').replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi, '$2: $1')
  .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();

// Builds e-mail number n (0, 1 or 2) for a lead row.
export function leadEmail(n, lead, appUrl) {
  const lang = lead.lang === 'pt' ? 'pt' : 'en';
  const d = T[lang], L = QUIZ_LABELS[lang], a = lead.answers || {};
  const name = esc((lead.name || '').trim().split(/\s+/)[0].slice(0, 20));
  const base = (appUrl || 'https://airapilates.app').replace(/\/+$/, '');
  const planUrl = `${base}/start?l=${lead.token}&src=email${n}`;
  const unsubUrl = `${base}/api/unsubscribe?t=${lead.token}`;
  const goal = L.goal[a.goal] || L.goal.corpo;
  const time = Number(a.time) || 15;
  let body = `<p style="margin:0 0 14px;font-size:18px"><b>${d.hi(name)}</b></p>`;
  let subject;

  if (n === 0) {
    subject = d.s0(name);
    const areas = (a.areas || []).map((x) => L.area[x]).filter(Boolean).join(', ');
    const row = (k, v) => v ? `<tr><td style="padding:6px 0;color:#7A6E86;width:42%">${k}</td><td style="padding:6px 0;font-weight:600">${esc(v)}</td></tr>` : '';
    const plan = Array.isArray(a.plan) && a.plan.length
      ? a.plan.filter((id) => CLASSES[id]).map((id) => ({ min: CLASSES[id].min, en: CLASSES[id].en.title, pt: CLASSES[id].title }))
      : firstWeek(a);
    const week = plan.map((c, i) => `<tr><td style="padding:8px 0;border-top:1px solid #EEE8F3;color:#7A6E86;width:22%">${lang === 'pt' ? 'Dia' : 'Day'} ${i + 1}</td><td style="padding:8px 0;border-top:1px solid #EEE8F3;font-weight:600">${esc(c[lang])}</td><td style="padding:8px 0;border-top:1px solid #EEE8F3;color:#7A6E86;text-align:right">${c.min} ${d.min}</td></tr>`).join('');
    body += `<p style="margin:0 0 18px">${d.p0}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3F8;border-radius:16px;padding:14px 18px">
${row(d.goal, goal)}${row(d.focus, areas)}${row(d.level, L.level[a.level] || L.level[1])}${row(d.time, d.perDay(time))}${row(d.days, a.days ? String(a.days) + (Number(a.days) >= 5 ? '+' : '') : '')}</table>
<p style="margin:22px 0 4px;font-weight:700">${d.week}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${week}</table>
${btn(planUrl, d.cta0)}<p style="margin:10px 0 0;font-size:14px;color:#7A6E86">${d.free}</p>`;
  } else if (n === 1) {
    subject = d.s1(name);
    body += `<p style="margin:0 0 14px">${d.p1a(esc(goal.toLowerCase()), time)}</p>
<p style="margin:0 0 8px">${d.p1b}</p><ul style="margin:0 0 6px;padding-left:20px">${d.tl.map((x) => `<li style="margin:0 0 6px">${x}</li>`).join('')}</ul>
${btn(planUrl, d.cta1)}<p style="margin:14px 0 0;font-size:15px;color:#5B3F7A"><i>${d.tip}</i></p>`;
  } else {
    subject = d.s2(name);
    body += `<p style="margin:0 0 14px">${d.p2a}</p>${d.obj.map(([q, ans]) => `<p style="margin:0 0 12px"><b>${q}</b><br>${ans}</p>`).join('')}
${btn(planUrl, d.cta2)}<p style="margin:12px 0 0;font-size:14px;color:#7A6E86">${d.p2b}</p>`;
  }
  const html = shell(body, d, unsubUrl);
  return { subject, html, text: toText(html), unsubscribeUrl: unsubUrl };
}
