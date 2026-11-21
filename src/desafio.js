/* ================= Desafio 30 Dias =================
   The challenge sold on /desafio. A questionnaire about her body, a personal 30-day plan in four
   phases (Ativar, Fortalecer, Integrar, Intensificar), one guided 10-minute session per day that
   unlocks day by day from the date she starts, a weekly check-in that adjusts the next week, and
   a step-by-step video lesson (Panda) for each exercise, unlocked together with its week. */

// Panda embed link of each lesson, by exercise id. Paste each link as the videos come in, e.g.
//   saw: 'https://player-vz-b390be26-62c.tv.pandavideo.com.br/embed/?v=VIDEO_ID',
// A lesson recorded horizontally can be given as { url:'https://…', wide:true }.
const DZ_VIDEOS = {
};
// The lessons are recorded vertically (Reels format); horizontal ones are marked wide above.
const DZ_VERTICAL = true;

const DZS = {
  pt: {
    tab:'Desafio', eb:'Desafio 30 Dias',
    introH:'Bem-vinda ao Desafio 30 Dias',
    introP:'Em 30 dias, você vai acordar os músculos que desenham a cintura, a barriga e o bumbum, com 10 minutos por dia. Primeiro, vamos montar o seu plano.',
    introL:['Um questionário rápido sobre o seu corpo', 'Seu plano de 30 dias, em 4 fases', 'Um treino guiado por dia, com voz e cronômetro', 'Aulas em vídeo com o passo a passo de cada exercício'],
    nameL:'Como você quer ser chamada?', namePh:'Seu nome', introBtn:'Montar meu plano',
    step:'Pergunta {n} de {t}', next:'Continuar', back:'Voltar', skip:'Pular esta pergunta', seePlan:'Ver meu plano',
    q_area:'Qual é a sua prioridade nesses 30 dias?', h_area:'As outras duas áreas também entram no plano, só com menos peso.',
    o_cintura:'Afinar a cintura', d_cintura:'Fechar as costelas e desenhar a curva da cintura',
    o_barriga:'Chapar a barriga', d_barriga:'Acordar o transverso, o “espartilho” natural da barriga',
    o_bumbum:'Empinar o bumbum', d_bumbum:'Ativar o glúteo médio e o máximo, que dão o formato redondo',
    q_belly:'No fim do dia, sua barriga fica mais estufada ou para frente?', o_belly_sim:'Sim, quase sempre', o_belly_as:'Às vezes', o_belly_nao:'Não',
    q_sit:'Quantas horas por dia você passa sentada?', o_sit_lt4:'Menos de 4 horas', o_sit_m48:'De 4 a 8 horas', o_sit_gt8:'Mais de 8 horas',
    q_shape:'Olhando de frente no espelho, sua cintura parece reta, sem curva?', o_shape_sim:'Sim', o_shape_pouco:'Um pouco', o_shape_nao:'Não',
    q_exp:'Qual é a sua experiência com Pilates ou exercícios?', o_exp_nunca:'Nunca fiz', o_exp_parei:'Já fiz, mas parei', o_exp_freq:'Treino com frequência',
    q_plank:'Você consegue ficar em prancha por 30 segundos?', o_plank_nao:'Ainda não', o_plank_esf:'Consigo, com esforço', o_plank_fac:'Consigo com facilidade',
    q_cond:'Alguma dessas situações vale para você?', h_cond:'Pode marcar mais de uma. Isso deixa o seu plano mais seguro.',
    o_gravida:'Estou grávida', o_posparto:'Tive bebê há menos de 6 meses', o_diastase:'Tenho diástase abdominal', o_lombar:'Sinto dor na lombar', o_pescoco:'Sinto dor no pescoço', o_joelho:'Sinto dor no joelho', o_nenhuma:'Nenhuma delas',
    q_waist:'Quer anotar a medida da sua cintura hoje?', h_waist:'É opcional. Meça na altura do umbigo, sem apertar. No fim do desafio, você compara.', cm:'Cintura (cm)',
    readyH:'Seu plano está pronto', readyHn:'{n}, seu plano está pronto', readyP:'Montamos os seus 30 dias de acordo com as suas respostas.',
    prio:'Prioridade', level:'Nível', perDay:'Por dia', perDayV:'10 min',
    p1:'Ativar', p1d:'Respiração e controle para acordar o transverso, os oblíquos e os glúteos.',
    p2:'Fortalecer', p2d:'Força para os músculos que você acordou: oblíquos, core e glúteo médio.',
    p3:'Integrar', p3d:'Os músculos trabalhando juntos, em movimentos do corpo todo.',
    p4:'Intensificar', p4d:'Versões mais desafiadoras para fixar o novo molde do seu corpo.',
    wk:'Semana {n}', final:'Reta final', finalD:'Dias 29 e 30: tudo o que você aprendeu, junto.',
    lightNote:'Os dias 7, 14, 21 e 28 são dias leves, de mobilidade, para o corpo se recuperar.',
    safeH:'Seu plano foi adaptado',
    s_gravida:'Gestação: sem exercícios deitada de barriga para cima, de bruços, com a cabeça elevada ou em prancha. Só comece com a liberação do seu médico.',
    s_posparto:'Pós-parto: sem abdominais com a cabeça elevada e sem prancha. Espere a liberação médica e, se puder, faça uma avaliação com uma fisioterapeuta pélvica.',
    s_diastase:'Diástase: sem abdominais com a cabeça elevada e sem prancha; o foco fica no transverso. Vale uma avaliação com uma fisioterapeuta.',
    s_lombar:'Lombar: sem exercícios que arqueiam ou sobrecarregam a lombar. Se a dor for forte ou aparecer no treino, pare e procure um profissional.',
    s_pescoco:'Pescoço: sem exercícios com a cabeça elevada do chão.',
    s_joelho:'Joelho: sem agachamentos e afundos.',
    safeAll:'Sentiu dor? Pare o exercício. O desafio não substitui a avaliação de um profissional de saúde.',
    begin:'Começar o Dia 1', backTo:'Voltar ao Desafio',
    dayOf:'Dia {n} de 30', phaseOf:'Semana {w} · {p}', doneOf:'{d} de 30 treinos feitos',
    todayK:'Treino de hoje', catchK:'Continue de onde parou', lightK:'Dia leve',
    doneTodayH:'Treino de hoje feito!', doneTodayP:'O Dia {n} libera amanhã. Descanse e volte para continuar.',
    allDoneH:'Você completou o Desafio 30 Dias!', allDoneP:'Parabéns pela constância. Seu acesso continua: refaça qualquer dia ou siga com as aulas do app.',
    startBtn:'Começar treino', openBtn:'Ver o treino',
    plan:'Seu plano', lessons:'Aulas do passo a passo', lessonsP:'Cada exercício tem uma aula em vídeo, que libera junto com a semana.',
    les1:'1 aula', lesN:'{n} aulas', lockIn:'Libera em {n} dias', lockTom:'Libera amanhã', soonTag:'Em breve', watch:'Ver aula',
    evo:'Sua evolução', wOne:'Cintura no início: <b style="color:var(--ink)">{c} cm</b>. Nos check-ins semanais, você mede de novo e acompanha a diferença aqui.', wStart:'No início', wLast:'Última medida', wDiff:'{d} cm',
    extrasH:'Quer treinar mais?', extrasP:'As outras aulas do app continuam liberadas como extra, no seu ritmo.', extrasBtn:'Ver aulas extras',
    redo:'Refazer o questionário',
    focus:'Foco de hoje', exs:'Exercícios de hoje', guided:'Começar treino guiado', again:'Refazer este treino',
    lockedH:'Este dia ainda não liberou', lockedP:'O Dia {n} libera em {d}.',
    lightP:'Hoje é dia de soltar o corpo: respiração e mobilidade para recuperar e voltar mais forte amanhã.',
    lightT:'Dia leve: mobilidade', finalT:'Grande final', classT:'Desafio · Dia {n}',
    ckH:'Check-in da Semana {w}', ckP:'Como foram os treinos desta semana? Sua resposta ajusta a próxima.',
    ckFinalH:'Check-in final', ckFinalP:'Você chegou ao fim! Meça sua cintura de novo e compare com o começo.',
    ckEasy:'Fácil demais', ckIdeal:'Na medida', ckHard:'Difícil', ckWaist:'Cintura hoje (cm, opcional)', ckSave:'Salvar check-in', ckLater:'Agora não',
    ckCardH:'Faça o check-in da Semana {w}', ckCardP:'Leva 10 segundos e ajusta a intensidade da próxima semana.', ckCardFinal:'Faça o check-in final e compare sua cintura.', ckDo:'Fazer check-in',
    ckT_easy:'Anotado! A próxima semana vem um pouco mais intensa.', ckT_ideal:'Anotado! Seguimos no mesmo ritmo.', ckT_hard:'Anotado! A próxima semana vem um pouco mais leve.', ckT_final:'Check-in final salvo. Parabéns!',
    vH:'Aula: {n}', vSoon:'A aula em vídeo deste exercício entra aqui em breve.', vAnim:'Ver o exercício animado', vLocked:'Esta aula libera junto com a semana dela.', close:'Fechar',
    dDone:'Dia {n} de 30 concluído!', dNext:'O próximo dia libera amanhã.', dBack:'Voltar ao Desafio',
    hcNew:'Monte seu plano de 30 dias: 10 minutos por dia para cintura, barriga e bumbum.', hcNewBtn:'Começar o Desafio', hcGo:'Continuar',
    a_cintura:'Cintura', a_barriga:'Barriga', a_bumbum:'Bumbum', and:' e ',
    started:'Seu Desafio começou hoje! Bom treino.'
  },
  en: {
    tab:'Challenge', eb:'30-Day Challenge',
    introH:'Welcome to the 30-Day Challenge',
    introP:'In 30 days, you’ll wake up the muscles that shape your waist, belly and glutes, in 10 minutes a day. First, let’s build your plan.',
    introL:['A quick questionnaire about your body', 'Your 30-day plan, in 4 phases', 'One guided workout a day, with voice and timer', 'Video lessons with the step by step of each exercise'],
    nameL:'What should we call you?', namePh:'Your name', introBtn:'Build my plan',
    step:'Question {n} of {t}', next:'Continue', back:'Back', skip:'Skip this question', seePlan:'See my plan',
    q_area:'What is your priority for these 30 days?', h_area:'The other two areas are in the plan too, just with less weight.',
    o_cintura:'A slimmer waist', d_cintura:'Close the ribs and shape the curve of your waist',
    o_barriga:'A flatter belly', d_barriga:'Wake up the transverse, your belly’s natural corset',
    o_bumbum:'A lifted butt', d_bumbum:'Activate the gluteus medius and maximus, which give the round shape',
    q_belly:'At the end of the day, does your belly look bloated or pushed forward?', o_belly_sim:'Yes, almost always', o_belly_as:'Sometimes', o_belly_nao:'No',
    q_sit:'How many hours a day do you spend sitting?', o_sit_lt4:'Less than 4 hours', o_sit_m48:'4 to 8 hours', o_sit_gt8:'More than 8 hours',
    q_shape:'Looking in the mirror from the front, does your waist look straight, without a curve?', o_shape_sim:'Yes', o_shape_pouco:'A little', o_shape_nao:'No',
    q_exp:'How much experience do you have with Pilates or exercise?', o_exp_nunca:'I’ve never done it', o_exp_parei:'I did, but stopped', o_exp_freq:'I work out often',
    q_plank:'Can you hold a plank for 30 seconds?', o_plank_nao:'Not yet', o_plank_esf:'Yes, with effort', o_plank_fac:'Yes, easily',
    q_cond:'Do any of these apply to you?', h_cond:'Choose all that apply. This makes your plan safer.',
    o_gravida:'I’m pregnant', o_posparto:'I had a baby less than 6 months ago', o_diastase:'I have diastasis recti', o_lombar:'Lower back pain', o_pescoco:'Neck pain', o_joelho:'Knee pain', o_nenhuma:'None of these',
    q_waist:'Want to write down your waist measurement today?', h_waist:'Optional. Measure at your belly button, without squeezing. At the end, you compare.', cm:'Waist (cm)',
    readyH:'Your plan is ready', readyHn:'{n}, your plan is ready', readyP:'We built your 30 days from your answers.',
    prio:'Priority', level:'Level', perDay:'Per day', perDayV:'10 min',
    p1:'Activate', p1d:'Breathing and control to wake up your transverse, obliques and glutes.',
    p2:'Strengthen', p2d:'Strength for the muscles you woke up: obliques, core and gluteus medius.',
    p3:'Integrate', p3d:'The muscles working together, in whole-body moves.',
    p4:'Intensify', p4d:'More challenging versions to set your body’s new shape.',
    wk:'Week {n}', final:'Final stretch', finalD:'Days 29 and 30: everything you learned, together.',
    lightNote:'Days 7, 14, 21 and 28 are light mobility days, so your body can recover.',
    safeH:'Your plan was adapted',
    s_gravida:'Pregnancy: no exercises lying on your back or belly, with your head lifted, or in a plank. Only start with your doctor’s clearance.',
    s_posparto:'Postpartum: no ab work with your head lifted and no planks. Wait for medical clearance and, if you can, see a pelvic floor physical therapist.',
    s_diastase:'Diastasis: no ab work with your head lifted and no planks; the focus is on the transverse. A physical therapist assessment is worth it.',
    s_lombar:'Lower back: no exercises that arch or load your lower back. If the pain is strong or shows up while training, stop and see a professional.',
    s_pescoco:'Neck: no exercises with your head lifted off the mat.',
    s_joelho:'Knee: no squats or lunges.',
    safeAll:'Feel pain? Stop the exercise. This challenge doesn’t replace an assessment by a health professional.',
    begin:'Start Day 1', backTo:'Back to the Challenge',
    dayOf:'Day {n} of 30', phaseOf:'Week {w} · {p}', doneOf:'{d} of 30 workouts done',
    todayK:'Today’s workout', catchK:'Pick up where you left off', lightK:'Light day',
    doneTodayH:'Today’s workout is done!', doneTodayP:'Day {n} unlocks tomorrow. Rest and come back to keep going.',
    allDoneH:'You completed the 30-Day Challenge!', allDoneP:'Congrats on showing up. Your access continues: redo any day or keep going with the app’s classes.',
    startBtn:'Start workout', openBtn:'See the workout',
    plan:'Your plan', lessons:'Step-by-step lessons', lessonsP:'Each exercise has a video lesson, unlocked together with its week.',
    les1:'1 lesson', lesN:'{n} lessons', lockIn:'Unlocks in {n} days', lockTom:'Unlocks tomorrow', soonTag:'Coming soon', watch:'Watch lesson',
    evo:'Your progress', wOne:'Waist at the start: <b style="color:var(--ink)">{c} cm</b>. At each weekly check-in, you measure again and follow the difference here.', wStart:'At the start', wLast:'Latest', wDiff:'{d} cm',
    extrasH:'Want to train more?', extrasP:'The app’s other classes stay open as extras, at your own pace.', extrasBtn:'See extra classes',
    redo:'Retake the questionnaire',
    focus:'Today’s focus', exs:'Today’s exercises', guided:'Start guided workout', again:'Redo this workout',
    lockedH:'This day isn’t unlocked yet', lockedP:'Day {n} unlocks on {d}.',
    lightP:'Today is about loosening up: breathing and mobility to recover and come back stronger tomorrow.',
    lightT:'Light day: mobility', finalT:'Grand finale', classT:'Challenge · Day {n}',
    ckH:'Week {w} check-in', ckP:'How were this week’s workouts? Your answer adjusts the next one.',
    ckFinalH:'Final check-in', ckFinalP:'You made it to the end! Measure your waist again and compare with the start.',
    ckEasy:'Too easy', ckIdeal:'Just right', ckHard:'Hard', ckWaist:'Waist today (cm, optional)', ckSave:'Save check-in', ckLater:'Not now',
    ckCardH:'Do your Week {w} check-in', ckCardP:'It takes 10 seconds and adjusts next week’s intensity.', ckCardFinal:'Do your final check-in and compare your waist.', ckDo:'Check in',
    ckT_easy:'Got it! Next week gets a little more intense.', ckT_ideal:'Got it! Same pace next week.', ckT_hard:'Got it! Next week gets a little lighter.', ckT_final:'Final check-in saved. Congrats!',
    vH:'Lesson: {n}', vSoon:'The video lesson for this exercise is coming here soon.', vAnim:'See the animated exercise', vLocked:'This lesson unlocks together with its week.', close:'Close',
    dDone:'Day {n} of 30 complete!', dNext:'The next day unlocks tomorrow.', dBack:'Back to the Challenge',
    hcNew:'Build your 30-day plan: 10 minutes a day for your waist, belly and glutes.', hcNewBtn:'Start the Challenge', hcGo:'Continue',
    a_cintura:'Waist', a_barriga:'Belly', a_bumbum:'Glutes', and:' and ',
    started:'Your Challenge starts today! Enjoy your workout.'
  }
};
const dz = (k, v) => { let s = (DZS[S.lang] || DZS.pt)[k]; if (s === undefined) s = DZS.pt[k]; if (typeof s === 'string' && v) Object.keys(v).forEach((x) => { s = s.split('{' + x + '}').join(v[x]); }); return s; };

/* ---------- The plan ---------- */
const DZ_AREAS = ['cintura', 'barriga', 'bumbum'];
const DZ_TINT = { 1:'sage', 2:'lilac', 3:'peach', 4:'dusk' };
// Exercises for each area and phase. An entry is one exercise for every level, or [beginner, intermediate, advanced].
const DZ_POOL = {
  cintura: [
    ['saw', 'mermaid', ['deadbug','crisscross','crisscross']],
    [['deadbug','crisscross','crisscross'], 'saw', ['birddog','mermaid','sidePlank']],
    [['deadbug','crisscross','crisscross'], ['birddog','saw','sidePlank'], 'mermaid', 'saw'],
    [['birddog','crisscross','sidePlank'], ['deadbug','saw','crisscross'], 'saw', 'mermaid']
  ],
  barriga: [
    ['toeTaps', 'deadbug', ['pelvic','hundredTT','hundredTT'], 'halfRoll'],
    [['hundredTT','hundredTT','hundred'], ['toeTaps','singleleg','singleleg'], ['deadbug','deadbug','doubleleg'], ['halfRoll','halfRoll','rollup']],
    [['hundredTT','hundred','hundred'], ['toeTaps','singleleg','doubleleg'], ['birddog','plank','plank'], ['halfRoll','rollup','rollup']],
    [['hundredTT','hundred','hundred'], ['deadbug','doubleleg','scissors'], ['birddog','plank','plank'], ['halfRoll','rollup','teaser']]
  ],
  bumbum: [
    ['bridge', 'clamshell', 'donkey', 'sidekick'],
    [['bridge','bridgeMarch','bridgeMarch'], ['clamshell','sidekick','sideDouble'], ['donkey','donkey','singleKick'], 'legLiftStand'],
    [['bridge','bridgeMarch','bridgeSingle'], ['donkey','swimming','swimming'], ['squat','squat','lunge'], ['sidekick','innerThigh','sideDouble'], ['clamshell','legLiftStand','legLiftStand']],
    [['bridge','bridgeMarch','bridgeSingle'], ['donkey','singleKick','singleKick'], ['squat','lunge','lunge'], ['sidekick','innerThigh','sideDouble'], 'clamshell']
  ]
};
const DZ_FALLBACK = {
  cintura:['saw','mermaid','birddog','deadbug'],
  barriga:['toeTaps','deadbug','birddog','pelvic','catcow'],
  bumbum:['clamshell','sidekick','donkey','legLiftStand','bridge']
};
const DZ_OPEN = { 1:['breathe','pelvic'], 2:['breathe','pelvic'], 3:['warm','breathe'], 4:['warm','catcow'] };
const DZ_LIGHT = ['breathe','pelvic','catcow','mermaid','saw','spine','bridge','child'];
// What each health situation leaves out.
const DZ_HEAD = ['hundredTT','hundred','singleleg','doubleleg','scissors','crisscross'];
const DZ_CURL = ['halfRoll','rollup','teaser','rollBall','rollover'];
const DZ_PRONE = ['swimming','singleKick','swan'];
const DZ_SUPINE = ['breathe','pelvic','toeTaps','deadbug','bridge','bridgeMarch','bridgeSingle','hamstring','legCircles'];
const DZ_PLANKS = ['plank','sidePlank','kneePush','pushup','climber','tableTop','jacks'];
const DZ_AVOID = {
  gravida: [].concat(DZ_HEAD, DZ_CURL, DZ_PRONE, DZ_SUPINE, DZ_PLANKS),
  posparto: [].concat(DZ_HEAD, DZ_CURL, ['plank','pushup','climber','sidePlank','jacks']),
  diastase: [].concat(DZ_HEAD, DZ_CURL, ['plank','pushup','climber','sidePlank']),
  lombar: ['doubleleg','scissors','rollup','teaser','rollover','swan','hundred','swimming','singleKick','legCircles'],
  pescoco: DZ_HEAD.slice(),
  joelho: ['squat','lunge']
};
const DZ_COND = ['gravida','posparto','diastase','lombar','pescoco','joelho'];

const dzOn = () => !!(S.desafio && S.desafio.a);
const dzConds = () => ((S.desafio && S.desafio.a && S.desafio.a.cond) || []).filter((c) => DZ_COND.indexOf(c) !== -1);
function dzSafe(id){ return !!EX[id] && !dzConds().some((c) => DZ_AVOID[c].indexOf(id) !== -1); }
const dzPhase = (n) => Math.min(4, Math.ceil(n / 7));
const dzLight = (n) => n % 7 === 0 && n <= 28;
function dzCap(){ const c = dzConds(); return c.some((x) => ['gravida','posparto','diastase'].indexOf(x) !== -1) ? 1 : c.indexOf('lombar') !== -1 ? 2 : 3; }
function dzBaseLevel(a){
  const e = { nunca:0, parei:1, freq:2 }[a.exp] || 0, p = { nao:0, esf:1, fac:2 }[a.plank] || 0, sum = e + p;
  return sum >= 4 ? 3 : sum >= 2 ? 2 : 1;
}
// Level for a week: her starting level, moved up or down by each earlier check-in.
function dzLevel(n){
  const D = S.desafio, w = dzPhase(n);
  let l = D.base || 1;
  for (let j = 1; j < w; j++) { const c = (D.ck || {})[j]; if (c && c.feel === 'easy') l++; if (c && c.feel === 'hard') l--; }
  return Math.max(1, Math.min(dzCap(), l));
}
function dzWeights(n){
  const a = S.desafio.a, W = { cintura:1, barriga:1, bumbum:1 };
  W[a.area] += 2;
  W.barriga += { sim:1, as:0.5 }[a.belly] || 0;
  W.bumbum += { gt8:1, m48:0.5 }[a.sit] || 0;
  W.cintura += { sim:1, pouco:0.5 }[a.shape] || 0;
  const others = DZ_AREAS.filter((x) => x !== a.area).sort((x, y) => W[y] - W[x]);
  W[others[n % 2]] += 0.3; // alternate which secondary area gets the extra exercise
  return W;
}
function dzAlloc(W, k){
  const tot = DZ_AREAS.reduce((s, x) => s + W[x], 0), c = {}, rem = [];
  DZ_AREAS.forEach((x) => { const q = W[x] * k / tot; c[x] = Math.floor(q); rem.push([q - c[x], x]); });
  let left = k - DZ_AREAS.reduce((s, x) => s + c[x], 0);
  rem.sort((p, q) => q[0] - p[0]).forEach((r) => { if (left > 0) { c[r[1]]++; left--; } });
  DZ_AREAS.forEach((x) => { if (!c[x]) { const big = DZ_AREAS.slice().sort((p, q) => c[q] - c[p])[0]; if (c[big] > 1) { c[big]--; c[x] = 1; } } });
  return c;
}
const dzPick = (e, l) => Array.isArray(e) ? e[l - 1] : e;
function dzFit(id, l){ let e = id; const seen = {}; while (e && EX[e] && EX[e].level > l && EX[e].easy && !seen[e]) { seen[e] = 1; e = EX[e].easy; } return EX[e] && EX[e].level <= l ? e : null; }
// One day of the plan: kind, phase, level and the exercises (openers, main block done twice, closing stretch).
function dzDay(n){
  const ph = dzPhase(n), lvl = dzLevel(n), L = LEVELS[lvl], D = { n, phase:ph, lvl, tint:DZ_TINT[ph] };
  if (dzLight(n)) {
    D.kind = 'light';
    D.open = []; D.main = DZ_LIGHT.filter(dzSafe); D.close = [];
    if (D.main.length < 7) D.main = D.main.concat(['warm','rolldown','catcow','mermaid','saw','releve','child'].filter((x) => D.main.indexOf(x) === -1 && dzSafe(x))).slice(0, 8);
    D.count = {};
    return D;
  }
  D.kind = n >= 29 ? 'final' : 'train';
  const slots = Math.round(600 / (L.work + L.rest)), mainSlots = slots - 2, k = Math.floor(mainSlots / 2), extra = mainSlots - 2 * k;
  const used = {}, take = (id) => { if (!id || used[id] || !dzSafe(id)) return false; used[id] = 1; return true; };
  let opens = DZ_OPEN[ph].filter(dzSafe);
  if (opens.length < 2) opens = opens.concat(['warm','catcow','breathe'].filter((x) => opens.indexOf(x) === -1 && dzSafe(x)));
  D.open = opens.slice(0, 1 + extra); D.open.forEach(take);
  const cnt = dzAlloc(dzWeights(n), k), lists = {}, di = (n - 1) % 7;
  DZ_AREAS.forEach((x) => {
    const pool = DZ_POOL[x][ph - 1].map((e) => dzFit(dzPick(e, lvl), lvl)).filter(Boolean), out = [];
    for (let i = 0; i < pool.length && out.length < cnt[x]; i++) { const id = pool[(di + i) % pool.length]; if (take(id)) out.push(id); }
    DZ_FALLBACK[x].forEach((id) => { if (out.length < cnt[x] && take(id)) out.push(id); });
    lists[x] = out;
  });
  // Not enough safe exercises in the pools (e.g. pregnancy): fill the gap with other safe ones.
  const extraPool = ['birddog','legLiftStand','clamshell','sidekick','donkey','squat','releve','mermaid','saw','rolldown','catcow','spine','warm'];
  let have = DZ_AREAS.reduce((s, x) => s + lists[x].length, 0);
  for (let i = 0; have < k && i < extraPool.length; i++) { const id = dzFit(extraPool[(di + i) % extraPool.length], lvl); if (take(id)) { lists[S.desafio.a.area].push(id); have++; } }
  D.count = cnt;
  const order = [S.desafio.a.area].concat(DZ_AREAS.filter((x) => x !== S.desafio.a.area).sort((x, y) => cnt[y] - cnt[x]));
  D.main = [];
  for (let i = 0; D.main.length < k && i < 12; i++) order.forEach((x) => { if (lists[x][i] && D.main.length < k) D.main.push(lists[x][i]); });
  let close = n % 2 ? 'mermaid' : 'child';
  if (used[close] || !dzSafe(close)) close = ['child','mermaid','catcow','spine'].find((x) => !used[x] && dzSafe(x));
  D.close = close ? [close] : [];
  return D;
}
const dzIds = (D) => { const o = []; D.open.concat(D.main, D.close).forEach((x) => { if (o.indexOf(x) === -1) o.push(x); }); return o; };
// The same shape buildPlan() returns, so the guided player runs the day like any class.
function dzPlan(n){
  const D = dzDay(n), L = LEVELS[D.lvl], seq = [];
  if (D.kind === 'light') D.main.forEach((id) => seq.push({ id, round:1 }));
  else {
    D.open.forEach((id) => seq.push({ id, round:1 }));
    [1, 2].forEach((r) => D.main.forEach((id) => seq.push({ id, round:r })));
    D.close.forEach((id) => seq.push({ id, round:2 }));
  }
  const secs = seq.length * L.work + (seq.length - 1) * L.rest;
  return { base:dzIds(D), seq, rounds:D.kind === 'light' ? 1 : 2, swaps:[], work:L.work, rest:L.rest, min:Math.max(1, Math.round(secs / 60)) };
}
function dzTitle(D){
  if (D.kind === 'light') return dz('lightT');
  if (D.n === 30) return dz('finalT');
  return dz('p' + D.phase);
}
function dzFocus(D){
  if (D.kind === 'light') return '';
  const a = DZ_AREAS.filter((x) => D.count[x]).sort((x, y) => D.count[y] - D.count[x]).map((x, i) => i ? dz('a_' + x).toLowerCase() : dz('a_' + x));
  return a.length > 1 ? a.slice(0, -1).join(', ') + dz('and') + a[a.length - 1] : a.join('');
}

/* ---------- Calendar: days unlock one per day from the start date ---------- */
const dzDate = (s) => new Date(s + 'T00:00:00');
function dzCur(){ const D = S.desafio; if (!D || !D.start) return 0; return Math.max(1, Math.min(30, Math.round((today - dzDate(D.start)) / DAY) + 1)); }
const dzOpen = (n) => n <= dzCur();
const dzDone = (n) => !!(S.desafio.done || {})[n];
const dzDoneCount = () => Object.keys(S.desafio.done || {}).filter((k) => Number(k) >= 1 && Number(k) <= 30).length;
function dzNext(){ for (let n = 1; n <= dzCur(); n++) if (!dzDone(n)) return n; return 0; }
const dzDaysTo = (n) => n - dzCur();
const dzDayDate = (n) => { const d = dzDate(S.desafio.start); d.setDate(d.getDate() + n - 1); return d.toLocaleDateString(t('loc'), { weekday:'long', day:'numeric', month:'long' }); };
// The check-in that is due: after a week is over (or all its days are done), if she trained in it.
function dzCkDue(){
  const D = S.desafio; if (!D || !D.start) return 0; const ck = D.ck || {};
  for (let w = 1; w <= 4; w++) {
    if (ck[w]) continue;
    const days = [1,2,3,4,5,6,7].map((i) => 7 * (w - 1) + i), any = days.some(dzDone), all = days.every(dzDone);
    if (any && (dzCur() > 7 * w || all)) return w;
  }
  if (!ck[5] && dzDone(30)) return 5;
  return 0;
}
// Lessons of a week: the exercises that first show up in that week's days.
function dzLessons(){
  const seen = {}, weeks = [[], [], [], []];
  for (let n = 1; n <= 30; n++) dzIds(dzDay(n)).forEach((id) => { if (!seen[id]) { seen[id] = 1; weeks[dzPhase(n) - 1].push(id); } });
  return weeks;
}
function dzLessonOpen(id){
  if (!dzOn() || !S.desafio.start) return false;
  for (let n = 1; n <= dzCur(); n++) if (dzIds(dzDay(n)).indexOf(id) !== -1) return true;
  return false;
}
const dzVideo = (id) => { const v = DZ_VIDEOS[id]; return !v ? null : typeof v === 'string' ? { url:v, wide:!DZ_VERTICAL } : { url:v.url, wide:v.wide != null ? !!v.wide : !DZ_VERTICAL }; };

/* ---------- Questionnaire ---------- */
const DZ_Q = [
  { k:'area', opts:['cintura','barriga','bumbum'], big:true },
  { k:'belly', opts:['sim','as','nao'] },
  { k:'sit', opts:['lt4','m48','gt8'] },
  { k:'shape', opts:['sim','pouco','nao'] },
  { k:'exp', opts:['nunca','parei','freq'] },
  { k:'plank', opts:['nao','esf','fac'] },
  { k:'cond', opts:['gravida','posparto','diastase','lombar','pescoco','joelho','nenhuma'], multi:true },
  { k:'waist', num:true }
];
const DZ_AREA_ICON = { cintura:() => I.body, barriga:() => I.target, bumbum:() => I.bump };
const dzOptLabel = (q, o) => q.k === 'area' || q.k === 'cond' ? dz('o_' + o) : dz('o_' + q.k + '_' + o);

function vDzIntro(){
  return `<div class="screen">
    <div class="scroll">
      <div class="dzhero">${art('lilac', 'saw')}<span class="dztag">${esc(dz('eb'))}</span></div>
      <div class="pad" style="padding-top:22px;gap:18px">
        <div style="display:flex;flex-direction:column;gap:8px"><h1 class="h1">${dz('introH')}</h1><p class="sub">${dz('introP')}</p></div>
        <ul class="dzlist">${dz('introL').map((x, i) => `<li><span class="n">${i + 1}</span><span>${x}</span></li>`).join('')}</ul>
        <div class="field"><label for="dzName">${dz('nameL')}</label><input class="input" id="dzName" autocomplete="given-name" maxlength="40" placeholder="${dz('namePh')}" value="${esc(S.name || '')}"></div>
      </div>
    </div>
    <div class="bottom"><button type="button" class="btn" data-act="dz-intro">${dz('introBtn')}</button></div>
    ${S.screen === 'desafio' ? tabbar('desafio') : ''}
  </div>`;
}
function vDzQuiz(){
  const Q = S.dzQ || (S.dzQ = { i:0, a:{} }), q = DZ_Q[Q.i], v = Q.a[q.k], total = DZ_Q.length;
  let body;
  if (q.num) body = `<div class="field"><label for="dzWaist">${dz('cm')}</label><input class="input" id="dzWaist" type="text" inputmode="decimal" autocomplete="off" maxlength="6" placeholder="75" value="${v ? esc(v) : ''}"></div>`;
  else body = `<div style="display:flex;flex-direction:column;gap:10px">${q.opts.map((o) => {
    const on = q.multi ? (v || []).indexOf(o) !== -1 : v === o;
    const icon = q.big ? `<span class="dzic">${DZ_AREA_ICON[o]()}</span>` : `<span class="${q.multi ? 'dzbox' : 'radio'}"></span>`;
    return `<button type="button" class="opt" data-act="dz-ans" data-id="${o}" aria-pressed="${on}">${icon}<span><b>${dzOptLabel(q, o)}</b>${q.big ? `<span class="d">${dz('d_' + o)}</span>` : ''}</span></button>`;
  }).join('')}</div>`;
  const hint = dz('h_' + q.k);
  const canNext = q.num || (q.multi ? (v || []).length > 0 : !!v);
  return `<div class="screen">
    <div class="scroll"><div class="pad" style="gap:18px">
      <div style="display:flex;align-items:center;gap:12px">
        <button type="button" class="iconbtn" style="background:transparent" data-act="dz-qback" aria-label="${dz('back')}">${I.back}</button>
        <div class="ptrack" style="flex:1" aria-hidden="true"><i style="width:${Math.round(100 * (Q.i + 1) / total)}%"></i></div>
      </div>
      <span class="eyebrow">${dz('step', { n:Q.i + 1, t:total })}</span>
      <div style="display:flex;flex-direction:column;gap:6px"><h1 class="h1" style="font-size:24px">${dz('q_' + q.k)}</h1>${hint ? `<p class="sub" style="font-size:14px">${hint}</p>` : ''}</div>
      ${body}
    </div></div>
    <div class="bottom">
      <button type="button" class="btn" data-act="dz-qnext" ${canNext ? '' : 'disabled style="opacity:.45"'}>${Q.i === total - 1 ? dz('seePlan') : dz('next')}</button>
      ${q.num ? `<button type="button" class="btn ghost" data-act="dz-qskip">${dz('skip')}</button>` : ''}
    </div>
  </div>`;
}
function dzSafeNote(){
  const c = dzConds(); if (!c.length) return '';
  return `<section class="note dzsafe"><b>${dz('safeH')}</b>${c.map((x) => `<span>${dz('s_' + x)}</span>`).join('')}<span>${dz('safeAll')}</span></section>`;
}
function dzPhases(){
  return `<ol class="dzphases">${[1,2,3,4].map((p) => `<li><span class="n" style="background:var(${TINTS[DZ_TINT[p]][0]});color:var(${TINTS[DZ_TINT[p]][2]})">${p}</span><span><b>${dz('wk', { n:p })} · ${dz('p' + p)}</b><span class="small">${dz('p' + p + 'd')}</span></span></li>`).join('')}
    <li><span class="n" style="background:var(--plum);color:var(--white)">★</span><span><b>${dz('final')}</b><span class="small">${dz('finalD')}</span></span></li></ol>
    <p class="small" style="margin:0">${dz('lightNote')}</p>`;
}
function vDzReady(){
  const D = S.desafio, started = !!D.start;
  return `<div class="screen">
    <div class="scroll"><div class="pad" style="gap:18px">
      <svg class="done-mark" style="width:96px;height:96px" viewBox="0 0 132 132" aria-hidden="true"><circle cx="66" cy="66" r="64" style="fill:var(--plum-soft)"/><circle cx="66" cy="66" r="46" style="fill:var(--plum)"/><path d="M46 67l13 13 27-29" fill="none" style="stroke:var(--white)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div style="display:flex;flex-direction:column;gap:6px;text-align:center"><h1 class="h1">${S.name ? dz('readyHn', { n:esc(S.name) }) : dz('readyH')}</h1><p class="sub">${dz('readyP')}</p></div>
      <div class="grid3">
        <div class="stat"><b style="font-size:18px">${dz('a_' + D.a.area)}</b><span>${dz('prio')}</span></div>
        <div class="stat"><b style="font-size:18px">${lvName(dzLevel(1))}</b><span>${dz('level')}</span></div>
        <div class="stat warm"><b style="font-size:18px">${dz('perDayV')}</b><span>${dz('perDay')}</span></div>
      </div>
      ${dzSafeNote()}
      <section class="card progcard" style="gap:12px"><h2 class="h2">${dz('plan')}</h2>${dzPhases()}</section>
    </div></div>
    <div class="bottom"><button type="button" class="btn" data-act="dz-begin">${started ? dz('backTo') : dz('begin')}</button></div>
  </div>`;
}

/* ---------- Challenge home ---------- */
function dzTodayCard(){
  const nx = dzNext(), cur = dzCur();
  if (!nx) {
    if (cur >= 30 && dzDone(30)) return `<section class="card progcard dzwin"><span class="eyebrow">${dz('eb')}</span><h2 class="h2" style="font-size:20px;font-family:var(--font-display)">${dz('allDoneH')}</h2><p class="sub" style="font-size:14px">${dz('allDoneP')}</p></section>`;
    return `<section class="card progcard"><span class="eyebrow" style="color:var(--sage-ink)">${I.check} ${dz('doneTodayH')}</span><p class="sub" style="font-size:14px">${dz('doneTodayP', { n:cur + 1 })}</p>
      <button type="button" class="btn line" data-act="dz-day" data-id="${cur}">${dz('again')}</button></section>`;
  }
  const D = dzDay(nx), plan = dzPlan(nx), hero = D.main[0];
  return `<section class="card practice">
    <div class="cover">${art(D.tint, hero)}<span class="badge">${nx < cur ? dz('catchK') : D.kind === 'light' ? dz('lightK') : dz('todayK')}</span></div>
    <div class="body">
      <div class="metarow"><span class="small">${t('meta', { m:plan.min, n:plan.base.length })}</span>${lvBadge(D.lvl)}</div>
      <h3>${dz('dayOf', { n:nx })} · ${dzTitle(D)}</h3>
      <p class="sub" style="font-size:14px">${D.kind === 'light' ? dz('lightP') : dz('focus') + ': ' + dzFocus(D)}</p>
      <div style="display:flex;gap:10px;margin-top:6px"><button type="button" class="btn" style="height:52px;flex:1" data-act="dz-go" data-id="${nx}">${I.play}${dz('startBtn')}</button>
      <button type="button" class="btn line" style="height:52px;width:auto;padding:0 18px" data-act="dz-day" data-id="${nx}">${dz('openBtn')}</button></div>
    </div>
  </section>`;
}
function dzCkCard(){
  const w = dzCkDue(); if (!w) return '';
  return `<section class="cycle dzck"><span class="k">${w === 5 ? dz('ckFinalH') : dz('ckH', { w })}</span><p>${w === 5 ? dz('ckCardFinal') : dz('ckCardP')}</p>
    <button type="button" class="btn sm" style="width:auto;padding:0 22px;align-self:flex-start;background:var(--peach-ink)" data-act="dz-ck" data-id="${w}">${dz('ckDo')}</button></section>`;
}
function dzWeekGrid(){
  const nx = dzNext();
  const chip = (n) => {
    const done = dzDone(n), open = dzOpen(n), light = dzLight(n);
    const cls = 'dzd' + (done ? ' done' : '') + (n === nx ? ' next' : '') + (!open ? ' locked' : '') + (light ? ' light' : '');
    const label = dz('dayOf', { n }) + (done ? ' ✓' : !open ? ' 🔒' : '');
    return `<button type="button" class="${cls}" data-act="dz-day" data-id="${n}" aria-label="${esc(label)}">${done ? I.check : n}</button>`;
  };
  const row = (from, to) => { const o = []; for (let n = from; n <= to; n++) o.push(chip(n)); return o.join(''); };
  return [1,2,3,4].map((w) => `<div class="dzwk">
      <div class="sechead"><b>${dz('wk', { n:w })} · ${dz('p' + w)}</b><span class="small">${[1,2,3,4,5,6,7].filter((i) => dzDone(7 * (w - 1) + i)).length}/7</span></div>
      <div class="dzdays">${row(7 * w - 6, 7 * w)}</div></div>`).join('')
    + `<div class="dzwk"><div class="sechead"><b>${dz('final')}</b><span class="small">${[29,30].filter(dzDone).length}/2</span></div><div class="dzdays">${row(29, 30)}</div></div>`;
}
function dzLessonRow(id, open){
  const v = dzVideo(id);
  return `<div class="dzles">
    <button type="button" class="dzles-main" data-act="dz-ex" data-id="${id}"><span class="thumb">${poseThumb(id)}</span><span class="tx"><b>${tx(EX[id], 'name')}</b><span class="small">${EX[id].focus.map(focusName).join(' · ')}</span></span></button>
    <button type="button" class="dzplay${v ? '' : ' soon'}" data-act="dz-vid" data-id="${id}" ${open ? '' : 'disabled'} aria-label="${esc(dz('watch') + ': ' + tx(EX[id], 'name'))}">${v ? I.play : ''}<span>${v ? dz('watch') : dz('soonTag')}</span></button>
  </div>`;
}
function dzLessonsBlock(){
  const weeks = dzLessons(), cur = dzCur();
  return weeks.map((ids, i) => {
    const w = i + 1, first = 7 * i + 1, open = first <= cur, d = first - cur;
    if (!ids.length) return '';
    if (!open) return `<div class="dzles locked"><span class="ic">${I.lock}</span><span class="tx"><b>${dz('wk', { n:w })} · ${dz('p' + w)}</b><span class="small">${dz(ids.length === 1 ? 'les1' : 'lesN', { n:ids.length })} · ${d === 1 ? dz('lockTom') : dz('lockIn', { n:d })}</span></span></div>`;
    return `<div class="dzlw"><span class="eyebrow">${dz('wk', { n:w })} · ${dz('p' + w)}</span>${ids.map((id) => dzLessonRow(id, true)).join('')}</div>`;
  }).join('');
}
function dzEvo(){
  const D = S.desafio, ms = [];
  if (D.w0) ms.push(Number(D.w0));
  [1,2,3,4,5].forEach((w) => { const c = (D.ck || {})[w]; if (c && c.waist) ms.push(Number(c.waist)); });
  if (!ms.length) return '';
  const num = (x) => String(x).replace('.', S.lang === 'en' ? '.' : ',');
  if (ms.length === 1) return `<section class="card progcard"><span class="eyebrow">${dz('evo')}</span><p class="sub" style="font-size:14px">${dz('wOne', { c:num(ms[0]) })}</p></section>`;
  const first = ms[0], last = ms[ms.length - 1], diff = Math.round((last - first) * 10) / 10;
  return `<section class="card progcard"><span class="eyebrow">${dz('evo')}</span>
    <div class="grid3"><div class="stat"><b>${num(first)}</b><span>${dz('wStart')}</span></div><div class="stat"><b>${num(last)}</b><span>${dz('wLast')}</span></div>
    <div class="stat ${diff < 0 ? 'warm' : ''}"><b>${(diff > 0 ? '+' : '') + num(diff)}</b><span>cm</span></div></div></section>`;
}
function vDzHome(){
  if (!dzOn()) return vDzIntro();
  if (!S.desafio.start) return vDzReady();
  const cur = dzCur(), done = dzDoneCount(), ph = dzPhase(cur);
  return `<div class="screen">
    <div class="scroll"><div class="pad">
      <header style="display:flex;flex-direction:column;gap:6px">
        <span class="eyebrow">${dz('eb')}</span>
        <h1 class="h1">${dz('dayOf', { n:cur })}</h1>
        <span class="small">${cur >= 29 ? dz('final') : dz('phaseOf', { w:ph, p:dz('p' + ph) })}</span>
        <div class="dzbar" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${done}"><i style="width:${(100 * done / 30).toFixed(1)}%"></i></div>
        <span class="small">${dz('doneOf', { d:done })}</span>
      </header>
      ${dzCkCard()}
      ${dzTodayCard()}
      <section style="display:flex;flex-direction:column;gap:10px"><h2 class="h2">${dz('plan')}</h2>${dzWeekGrid()}</section>
      <section style="display:flex;flex-direction:column;gap:10px"><h2 class="h2">${dz('lessons')}</h2><p class="small" style="margin:0">${dz('lessonsP')}</p>${dzLessonsBlock()}</section>
      ${dzEvo()}
      ${dzSafeNote()}
      <section class="card progcard"><h2 class="h2">${dz('extrasH')}</h2><p class="sub" style="font-size:14px">${dz('extrasP')}</p>
        <button type="button" class="btn line" data-act="mod-go" data-id="todas">${dz('extrasBtn')}</button></section>
      <button type="button" class="link" data-act="dz-redo" style="align-self:center">${dz('redo')}</button>
    </div></div>
    ${tabbar('desafio')}
  </div>`;
}

/* ---------- One day ---------- */
function vDzDay(){
  const n = S.dzView || 1, D = dzDay(n), plan = dzPlan(n), open = dzOpen(n), done = dzDone(n), ids = dzIds(D);
  return `<div class="screen">
    <div class="scroll">
      <div class="dhero">${art(D.tint, D.main[0])}<button type="button" class="iconbtn" style="left:16px" data-go="desafio" aria-label="${dz('back')}">${I.back}</button></div>
      <div class="pad" style="padding-top:18px;gap:16px">
        <div style="display:flex;flex-direction:column;gap:8px">
          <span class="eyebrow">${n >= 29 ? dz('final') : dz('wk', { n:D.phase }) + ' · ' + dz('p' + D.phase)}</span>
          <h1 class="h1">${dz('dayOf', { n })} · ${dzTitle(D)}</h1>
          <div class="metarow"><span class="small">${t('meta', { m:plan.min, n:plan.base.length })}${plan.rounds > 1 ? ' · ' + t('rounds', plan.rounds) : ''}</span>${lvBadge(D.lvl)}</div>
          <p class="sub" style="font-size:14px">${D.kind === 'light' ? dz('lightP') : `<b style="color:var(--ink)">${dz('focus')}:</b> ${dzFocus(D)}. ${dz('p' + D.phase + 'd')}`}</p>
        </div>
        ${!open ? `<section class="note"><b>${dz('lockedH')}</b><br>${dz('lockedP', { n, d:dzDayDate(n) })}</section>` : ''}
        <section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${dz('exs')}</h2>${ids.map((id) => dzLessonRow(id, open)).join('')}</section>
      </div>
    </div>
    <div class="bottom"><button type="button" class="btn" data-act="dz-go" data-id="${n}" ${open ? '' : 'disabled style="opacity:.45"'}>${I.play}${done ? dz('again') : dz('guided')}</button></div>
  </div>`;
}

/* ---------- Sheets: check-in and lesson video (drawn over the current screen) ---------- */
function dzSheet(html){
  dzCloseSheet();
  const scr = app.querySelector('.screen'); if (!scr) return;
  const el = document.createElement('div');
  el.className = 'overlay'; el.id = 'dzSheet'; el.dataset.act = 'dz-x';
  el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="dzSheetT">${html}</div>`;
  scr.appendChild(el);
  const f = el.querySelector('button,input'); if (f) try { f.focus({ preventScroll:true }); } catch (e) {}
}
function dzCloseSheet(){ const el = document.getElementById('dzSheet'); if (el) el.remove(); }
function dzShowVideo(id){
  const v = dzVideo(id), open = dzLessonOpen(id) || S.screen === 'dzDay' && dzOpen(S.dzView || 1);
  let box;
  if (!open) box = `<p class="sub">${dz('vLocked')}</p>`;
  else if (!v) box = `<div class="dzvid soon"><span>${I.playBig}</span><p>${dz('vSoon')}</p></div>`;
  else box = `<div class="dzvid${v.wide ? ' wide' : ''}"><iframe src="${esc(v.url)}" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen title="${esc(tx(EX[id], 'name'))}"></iframe></div>`;
  dzSheet(`<h2 id="dzSheetT">${esc(dz('vH', { n:tx(EX[id], 'name') }))}</h2>${box}
    <p class="small" style="margin:0">${esc(tx(EX[id], 'tip'))}</p>
    ${S.screen !== 'exercise' ? `<button type="button" class="btn line" data-act="dz-ex" data-id="${id}">${dz('vAnim')}</button>` : ''}
    <button type="button" class="btn ghost" data-act="dz-x">${dz('close')}</button>`);
}
function dzShowCk(w, then){
  S.dzCkThen = then || null;
  const fin = w === 5, prev = (S.desafio.ck || {})[w] || {};
  dzSheet(`<h2 id="dzSheetT">${fin ? dz('ckFinalH') : dz('ckH', { w })}</h2><p class="sub" style="font-size:14px">${fin ? dz('ckFinalP') : dz('ckP')}</p>
    ${fin ? '' : `<div class="grid3" role="group">${['easy','ideal','hard'].map((f) => `<button type="button" class="tbtn dzfeel" style="font-size:14px" data-act="dz-feel" data-id="${f}" aria-pressed="${prev.feel === f}">${dz('ck' + f.charAt(0).toUpperCase() + f.slice(1))}</button>`).join('')}</div>`}
    <div class="field"><label for="dzCkW">${dz('ckWaist')}</label><input class="input" id="dzCkW" type="text" inputmode="decimal" autocomplete="off" maxlength="6" value="${prev.waist ? esc(prev.waist) : ''}"></div>
    <button type="button" class="btn" data-act="dz-cksave" data-id="${w}" ${fin || prev.feel && prev.feel !== 'skip' ? `data-feel="${prev.feel || ''}"` : 'disabled style="opacity:.45"'}>${dz('ckSave')}</button>
    <button type="button" class="btn ghost" data-act="dz-cklater" data-id="${w}">${dz('ckLater')}</button>`);
}
const dzNum = (v) => { const x = parseFloat(String(v || '').replace(',', '.')); return x >= 40 && x <= 200 ? Math.round(x * 10) / 10 : null; };

/* ---------- Running a day in the guided player ---------- */
function dzStart(n){
  if (!dzOpen(n)) return;
  const D = dzDay(n);
  S.dzRun = n; S.dzView = n; S.dzPrevCls = S.cls === 'desafio' ? (S.dzPrevCls || 'essencial') : S.cls;
  CLASSES.desafio = { title:DZS.pt.classT.replace('{n}', n), mod:'core', level:D.lvl, min:10, tint:D.tint, hero:D.main[0], desc:'', list:dzIds(D), fixed:true,
    en:{ title:DZS.en.classT.replace('{n}', n), desc:'' } };
  startClass('desafio');
}
function dzCleanup(){ delete CLASSES.desafio; S.cls = S.dzPrevCls || 'essencial'; }
const dzBaseBuild = buildPlan;
buildPlan = function(cid, lvl){ return cid === 'desafio' && S.dzRun ? dzPlan(S.dzRun) : dzBaseBuild(cid, lvl); };
const dzBaseFinish = finish;
finish = function(){
  const n = S.cls === 'desafio' ? S.dzRun : 0;
  S.dzJust = 0;
  if (n && S.desafio) { S.desafio.done = S.desafio.done || {}; if (!S.desafio.done[n]) S.desafio.done[n] = ymd(new Date()); S.dzJust = n; }
  dzBaseFinish();
  if (n) dzCleanup();
};

/* ---------- Screens and the tab bar ---------- */
VIEWS.desafio = vDzHome;
VIEWS.dzQuiz = vDzQuiz;
VIEWS.dzReady = vDzReady;
VIEWS.dzDay = vDzDay;
tabbar = function(cur){
  const b = (id, label, icon) => `<button type="button" data-go="${id}" ${cur === id ? 'aria-current="page"' : ''}>${icon}${label}</button>`;
  return `<nav class="tabbar four" aria-label="${t('nav')}">${b('home', t('tab.home'), I.home)}${b('desafio', dz('tab'), I.dzCal)}${b('explore', t('tab.explore'), I.grid)}${b('progress', t('tab.progress'), I.chart)}</nav>`;
};
I.dzCal = sv('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 14.5l2 2 4-4"/>', 24, 1.8);
function dzHomeCard(){
  if (!dzOn() || !S.desafio.start) return `<section class="card progcard dzhc"><span class="eyebrow">${dz('eb')}</span><p class="sub" style="font-size:14px">${dz('hcNew')}</p>
    <button type="button" class="btn sm" data-go="desafio">${dz('hcNewBtn')}</button></section>`;
  const nx = dzNext(), cur = dzCur(), done = dzDoneCount();
  const line = nx ? dz('dayOf', { n:nx }) + ' · ' + dzTitle(dzDay(nx)) : (cur >= 30 && dzDone(30) ? dz('allDoneH') : dz('doneTodayH'));
  return `<section class="card progcard dzhc"><div class="sechead"><span class="eyebrow">${dz('eb')}</span><span class="small">${dz('doneOf', { d:done })}</span></div>
    <b style="font-size:17px">${line}</b><div class="dzbar"><i style="width:${(100 * done / 30).toFixed(1)}%"></i></div>
    <button type="button" class="btn sm" ${nx ? `data-act="dz-go" data-id="${nx}"` : 'data-go="desafio"'}>${nx ? I.play + dz('startBtn') : dz('hcGo')}</button></section>`;
}
const dzHomeView = VIEWS.home;
VIEWS.home = () => dzHomeView().replace('<section class="card week"', dzHomeCard() + '<section class="card week"');
const dzDoneView = VIEWS.done;
VIEWS.done = () => {
  let h = dzDoneView(); const n = S.dzJust;
  if (!n) return h;
  const left = 30 - dzDoneCount(), ck = dzCkDue();
  h = h.replace('<div class="grid3">', `<section class="card progcard" style="text-align:center;align-items:center"><span class="eyebrow">${dz('eb')}</span><b style="font-size:18px">${dz('dDone', { n })}</b>
    <div class="dzbar" style="width:100%"><i style="width:${(100 * (30 - left) / 30).toFixed(1)}%"></i></div><span class="small">${dz('doneOf', { d:30 - left })}${!dzNext() && n < 30 ? ' · ' + dz('dNext') : ''}</span></section><div class="grid3">`);
  return h.replace(`<button type="button" class="btn" data-go="home">${t('d.home')}</button>`,
    ck ? `<button type="button" class="btn" data-act="dz-ck" data-id="${ck}">${ck === 5 ? dz('ckFinalH') : dz('ckH', { w:ck })}</button><button type="button" class="btn line" data-go="desafio">${dz('dBack')}</button>`
       : `<button type="button" class="btn" data-go="desafio">${dz('dBack')}</button>`);
};
const dzExView = VIEWS.exercise;
VIEWS.exercise = () => {
  const h = dzExView();
  if (!dzOn() || !dzLessonOpen(S.ex)) return h;
  const v = dzVideo(S.ex);
  return h.replace(`data-act="ex-listen">${I.vol}${t('e.listen')}</button>`, `data-act="ex-listen">${I.vol}${t('e.listen')}</button>
    <button type="button" class="btn line" data-act="dz-vid" data-id="${S.ex}">${I.play}${v ? dz('watch') : dz('watch') + ' · ' + dz('soonTag')}</button>`);
};

/* ---------- Taps ---------- */
function dzQuizDone(){
  const a = S.dzQ.a, old = S.desafio || {};
  a.cond = (a.cond || []).filter((c) => c !== 'nenhuma');
  const D = { v:1, a, start:old.start || null, done:old.done || {}, ck:old.ck || {}, w0:a.waist != null ? a.waist : (old.w0 || null) };
  delete a.waist;
  S.desafio = D;
  D.base = Math.min(dzBaseLevel(a), dzCap());
  S.level = D.base; S.onboarded = true;
  S.goals = { cintura:['core','corpo'], barriga:['core'], bumbum:['gluteos'] }[a.area].concat(dzConds().some((c) => ['lombar','pescoco'].indexOf(c) !== -1) ? ['postura'] : []);
  S.dzQ = null;
  go('dzReady');
}
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act],[data-go]'); if (!el) return;
  if (el.dataset.go) { dzCloseSheet(); if (S.screen === 'done') S.dzJust = 0; return; }
  const act = el.dataset.act, id = el.dataset.id;
  // Leaving the guided player of a challenge day goes back to that day, not to a class screen.
  if (act === 'exit' && S.cls === 'desafio') { e.stopPropagation(); stopPlayer(); dzCleanup(); S.screen = 'dzDay'; render(false); return; }
  if (act === 'ex-open' && (S.screen === 'dzDay' || S.screen === 'desafio')) { e.stopPropagation(); S.exFrom = S.screen; S.ex = id; S.screen = 'exercise'; render(false); return; }
  if (!act || act.indexOf('dz-') !== 0) return;
  e.stopPropagation();
  switch (act) {
    case 'dz-intro': { const nm = document.getElementById('dzName'); if (nm && nm.value.trim()) S.name = nm.value.trim().slice(0, 40); S.dzQ = { i:0, a:{} }; go('dzQuiz'); break; }
    case 'dz-ans': {
      const Q = S.dzQ, q = DZ_Q[Q.i];
      if (q.multi) {
        let v = (Q.a[q.k] || []).slice();
        if (id === 'nenhuma') v = v.indexOf('nenhuma') !== -1 ? [] : ['nenhuma'];
        else { v = v.filter((x) => x !== 'nenhuma'); const i = v.indexOf(id); if (i === -1) v.push(id); else v.splice(i, 1); }
        Q.a[q.k] = v; render(true);
      } else {
        Q.a[q.k] = id; render(true);
        const at = Q.i; setTimeout(() => { if (S.screen === 'dzQuiz' && S.dzQ && S.dzQ.i === at) { S.dzQ.i++; render(false); } }, 260);
      }
      break;
    }
    case 'dz-qnext': {
      const Q = S.dzQ, q = DZ_Q[Q.i];
      if (q.num) { const w = document.getElementById('dzWaist'); Q.a.waist = w ? dzNum(w.value) : null; }
      else if (q.multi ? !(Q.a[q.k] || []).length : !Q.a[q.k]) break;
      if (Q.i >= DZ_Q.length - 1) dzQuizDone(); else { Q.i++; render(false); }
      break;
    }
    case 'dz-qskip': S.dzQ.a.waist = null; dzQuizDone(); break;
    case 'dz-qback': if (S.dzQ.i > 0) { S.dzQ.i--; render(false); } else go('desafio'); break;
    case 'dz-begin':
      if (!S.desafio.start) { S.desafio.start = ymd(today); S.dzView = 1; S.screen = 'dzDay'; if (!ACC.standalone && !S.installSeen) S.showInstall = true; render(false); toast(dz('started')); }
      else go('desafio');
      break;
    case 'dz-redo': S.dzQ = { i:0, a:{} }; go('dzQuiz'); break;
    case 'dz-day': S.dzView = Number(id); go('dzDay'); break;
    case 'dz-go': {
      const n = Number(id), w = dzCkDue();
      if (w && w < 5 && dzPhase(n) > w) { dzShowCk(w, n); break; }
      dzStart(n); break;
    }
    case 'dz-ex': dzCloseSheet(); if (S.screen !== 'exercise') S.exFrom = S.screen; S.ex = id; S.screen = 'exercise'; render(false); break;
    case 'dz-vid': dzShowVideo(id); break;
    case 'dz-x': if (e.target === el || el.tagName === 'BUTTON') dzCloseSheet(); break;
    case 'dz-ck': dzShowCk(Number(id)); break;
    case 'dz-feel': {
      document.querySelectorAll('#dzSheet .dzfeel').forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
      const s = document.querySelector('#dzSheet [data-act="dz-cksave"]'); if (s) { s.disabled = false; s.style.opacity = ''; s.dataset.feel = id; }
      break;
    }
    case 'dz-cksave': {
      const w = Number(id), wv = document.getElementById('dzCkW'), then = S.dzCkThen;
      S.desafio.ck = S.desafio.ck || {};
      S.desafio.ck[w] = { feel:w === 5 ? 'final' : (el.dataset.feel || 'ideal'), waist:wv ? dzNum(wv.value) : null, at:ymd(new Date()) };
      dzCloseSheet(); S.dzCkThen = null;
      if (S.screen === 'done') S.dzJust = 0;
      if (then) { render(true); dzStart(then); } else { if (S.screen === 'done') S.screen = 'desafio'; render(true); }
      toast(dz(w === 5 ? 'ckT_final' : 'ckT_' + S.desafio.ck[w].feel));
      break;
    }
    case 'dz-cklater': {
      const w = Number(id), then = S.dzCkThen;
      // Skipping keeps the same intensity and stops asking about that week.
      S.desafio.ck = S.desafio.ck || {}; if (w < 5) S.desafio.ck[w] = { feel:'skip', at:ymd(new Date()) };
      dzCloseSheet(); S.dzCkThen = null;
      if (then) dzStart(then); else render(true);
      break;
    }
  }
}, true);
// Back from an exercise opened inside the challenge returns there.
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act="ex-back"]'); if (!el || ['dzDay','desafio'].indexOf(S.exFrom) === -1) return;
  e.stopPropagation(); hush(); dzCloseSheet(); S.screen = S.exFrom; render(false);
}, true);
// Install prompt also shows on the challenge home (first visit after login).
const dzHomeV = VIEWS.desafio;
VIEWS.desafio = () => { let h = dzHomeV(); if (S.showInstall && dzOn() && S.desafio.start) h = h.replace(/<\/div>\s*$/, installSheet() + '</div>'); return h; };

KEEP.push('desafio');
// Where she lands after login: the challenge for buyers of the challenge (or anyone who started it).
function dzLanding(){
  if (dzOn() && S.desafio.start) return 'desafio';
  if (ACC.sub && ACC.sub.plan === 'desafio') return dzOn() ? 'dzReady' : 'desafio';
  return S.onboarded ? 'home' : 'goals';
}
