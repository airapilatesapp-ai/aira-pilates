/* ---------------- Icons ---------------- */
const sv = (d, w, sw) => `<svg aria-hidden="true" width="${w||22}" height="${w||22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||1.9}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  back: sv('<path d="M15 18l-6-6 6-6"/>'),
  close: sv('<path d="M6 6l12 12"/><path d="M18 6L6 18"/>', 20, 2),
  chev: sv('<path d="M9 6l6 6-6 6"/>', 16, 2),
  down: sv('<path d="M6 9l6 6 6-6"/>', 16, 2),
  check: sv('<path d="M5 12l5 5 9-10"/>', 14, 3),
  heart: (f) => `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`,
  play: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
  playBig: '<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  prev: sv('<path d="M6 5v14"/><path d="M18 6l-8 6 8 6z"/>', 22, 2),
  next: sv('<path d="M18 5v14"/><path d="M6 6l8 6-8 6z"/>', 22, 2),
  arrow: sv('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>', 20, 2),
  home: sv('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', 24, 1.8),
  grid: sv('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>', 24, 1.8),
  chart: sv('<path d="M5 20V11"/><path d="M12 20V4"/><path d="M19 20v-6"/>', 24, 1.8),
  flame: sv('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.6 2 3 0-3 .5-5.5.5-8z"/>', 16, 2),
  flameL: sv('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.6 2 3 0-3 .5-5.5.5-8z"/>'),
  moon: sv('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
  bell: sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>', 20),
  lock: sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', 20),
  search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', 20, 2),
  clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 15, 2),
  layers: sv('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>', 15, 2),
  globe: sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>', 20),
  logo: '<svg aria-hidden="true" width="26" height="26" viewBox="18 18 72 72"><path d="M24 82 C28 76 33 70 34 60 C35 44 42 30 56 24 C68 19 80 23 85 33 C87 37 86 40 84 40 C80 33 72 31 64 33 C52 36 47 48 48 62 C49 71 53 77 60 82 C62 84 60 86 57 86 L27 86 C24 86 22 84 24 82 Z" fill="currentColor"/><ellipse cx="63" cy="50" rx="8.6" ry="9.4" transform="rotate(20 63 50)" fill="#E07C55"/></svg>',
  brand: '<svg aria-hidden="true" width="36" height="36" viewBox="0 0 100 100"><defs><linearGradient id="brBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6E4F92"/><stop offset="1" stop-color="#4A3168"/></linearGradient></defs><rect width="100" height="100" rx="23" fill="url(#brBg)"/><path d="M24 82 C28 76 33 70 34 60 C35 44 42 30 56 24 C68 19 80 23 85 33 C87 37 86 40 84 40 C80 33 72 31 64 33 C52 36 47 48 48 62 C49 71 53 77 60 82 C62 84 60 86 57 86 L27 86 C24 86 22 84 24 82 Z" fill="#FFFFFF"/><ellipse cx="63" cy="50" rx="8.6" ry="9.4" transform="rotate(20 63 50)" fill="#F29A72"/></svg>',
  bolt: sv('<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>'),
  spine: sv('<path d="M12 3v18"/><path d="M8 6h8M7 10h10M8 14h8M9 18h6"/>'),
  drop: sv('<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>'),
  body: sv('<circle cx="12" cy="4.5" r="2"/><path d="M5 9l7-1.5L19 9"/><path d="M12 7.5v6l-3 7.5M12 13.5l3 7.5"/>'),
  target: sv('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  bridgeI: sv('<path d="M3 19h18"/><path d="M5 19c1-5 4-8 7-8s6 3 7 8"/><circle cx="4.5" cy="16" r="1.5"/>'),
  legs: sv('<path d="M9 3v7l-2 11M15 3v7l2 11"/><path d="M9 10h6"/>'),
  arms: sv('<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>'),
  wave: sv('<path d="M3 12c2.5-5 5.5-5 7.5 0s5 5 7.5 0 3-2 3-2"/>'),
  stand: sv('<circle cx="12" cy="4" r="2"/><path d="M12 6.5v7.5M12 14l-3 7M12 14l3 7M7 10l5-2 5 2"/>'),
  bump: sv('<circle cx="11" cy="4" r="2"/><path d="M10.5 7c-1.5 3-1.5 6 0 8.5L10 21M12 9c3.5.5 4 6 .5 7.5L13 21"/>'),
  ring: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>'),
  vol: sv('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>', 20),
  mute: sv('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/>', 20)
};

/* ---------------- Language ----------------
   Every interface string has a Brazilian Portuguese and a US English version; content (exercises, classes,
   categories, levels, goals) carries its English text in an `en` field. */
const STR = {
  pt: {
    'w.title':'Pilates em casa, todos os dias', 'w.sub':(v)=>`${v.ex} exercícios e ${v.cl} aulas em ${v.mod} modalidades, adaptadas ao seu nível e ao seu ciclo.`,
    'w.start':'Começar agora', 'w.login':'Já tenho uma conta', 'back':'Voltar',
    'g.top':'Personalize suas aulas', 'g.title':'Vamos montar a sua rotina', 'g.sub':'Suas respostas definem as aulas sugeridas e o ritmo de cada exercício.',
    'g.name':'Como podemos te chamar?', 'g.goals':'O que você busca?', 'g.many':'Escolha quantos quiser', 'g.level':'Seu nível no Pilates', 'g.time':'Quanto tempo por dia?',
    'g.sum':(v)=>`${v.n===0?'Nenhum objetivo':v.n===1?'1 objetivo':v.n+' objetivos'} · ${v.l} · ${v.m} min por dia`, 'g.create':'Criar minha rotina',
    'timing':(v)=>`${v.w}s por exercício · ${v.r}s de pausa`,
    'h.morning':'Bom dia', 'h.afternoon':'Boa tarde', 'h.evening':'Boa noite', 'h.you':'você', 'days':(n)=>n===1?'1 dia':n+' dias',
    'h.level':(l)=>'Nível '+l, 'h.week':'Esta semana', 'h.today':'Aula de hoje', 'h.doneToday':'Concluída hoje',
    'meta':(v)=>`${v.m} min · ${v.n} exercícios`, 'rounds':(r)=>r===1?'1 rodada':r+' rodadas', 'h.start':'Começar aula', 'h.again':'Fazer de novo',
    'l1.eb':'Seu caminho de iniciante', 'l1.t':'Fundamentos em 14 dias', 'l1.p':'Aprenda a respiração, a ativação do centro e o alinhamento antes de acelerar.',
    'l2.eb':'Programa intermediário', 'l2.t':'21 dias de abdômen', 'l2.p':'Os clássicos do solo, um pouco mais intensos a cada semana.',
    'l3.eb':'Desafio da semana', 'l3.t':'Dominar o Teaser', 'l3.p':'O exercício-símbolo do Pilates. Veja a execução em detalhe e treine na aula Abdômen avançado.',
    'prog.day':(v)=>`Dia ${v.d} de ${v.n}`, 'prog.btn':'Aula de hoje do programa', 'see.ex':'Ver exercício', 'train':'Treinar',
    'h.mods':'Modalidades', 'h.seeAll':'Ver todas', 'cy.k':'Seu ciclo · dia 22 · fase lútea',
    'cy.p':'Seu corpo pede mais calma nesta fase. Separamos aulas de Pilates mais suaves para esta semana.', 'cy.btn':'Ver aulas da fase', 'h.other':'Para outros momentos',
    'tab.home':'Hoje', 'tab.explore':'Explorar', 'tab.progress':'Progresso', 'nav':'Navegação principal',
    'sh.t':'Seu nível', 'sh.p':'As aulas, as versões dos exercícios e o tempo de cada um se ajustam ao nível escolhido.', 'close':'Fechar', 'fav':'Favorita',
    'c.favAdd':'Salvar nos favoritos', 'c.favRm':'Remover dos favoritos', 'c.ex':(n)=>n+' exercícios',
    'c.adapt':(v)=>`<b>Adaptada para o nível ${v.l}:</b> ${v.w}s de exercício e ${v.r}s de pausa entre eles.`, 'c.swaps':'Trocamos por versões do seu nível:',
    'c.dropped':(n)=>n===1?'1 exercício avançado ficou de fora por enquanto.':n+' exercícios avançados ficaram de fora por enquanto.',
    'c.change':'Mudar nível', 'c.list':'Exercícios da aula', 'c.tap':'Toque para ver', 'c.times':(v)=>`${v.n}× de ${v.w}s`,
    'c.voice':'Voz guia', 'c.voiceOn':'Explica cada exercício, guia a respiração e faz a contagem final', 'off':'Desligado', 'c.start':(m)=>'Iniciar aula · '+m+' min',
    'e.listen':'Ouvir as instruções', 'e.t1':'1º tempo', 'e.t2':'2º tempo', 'e.lvl':'No seu nível',
    'e.lvlTxt':(v)=>v.fast?`${v.w} segundos por série, em ritmo contínuo.`:`${v.w} segundos por série, cerca de ${v.reps} repetições.`,
    'e.versions':'Outras versões', 'e.easier':'Mais fácil', 'e.harder':'Mais difícil', 'e.in':'Aparece nestas aulas', 'anim':'Animação do exercício',
    'p.exit':'Sair da aula', 'p.count':(v)=>`Exercício ${v.n} de ${v.t}`+(v.R>1?` · Rodada ${v.r}/${v.R}`:''), 'p.left':'restantes', 'p.restL':'de pausa',
    'p.rest':'Pausa', 'p.restTip':'Respire e prepare-se. ', 'p.next':'A seguir', 'p.after':'Depois', 'p.last':'Última série', 'p.lastTxt':'Depois dela, a aula termina',
    'p.prev':'Exercício anterior', 'p.pause':'Pausar', 'p.resume':'Continuar', 'p.nextB':'Próximo exercício', 'p.finish':'Concluir aula',
    'p.cueRest':(n)=>'Pausa · próximo: '+n, 'p.paused':'Em pausa', 'p.breathe':'Respire no seu ritmo',
    'p.exitT':'Sair da aula?', 'p.exitP':'Esta aula ainda não conta para a sua sequência.', 'p.stay':'Continuar aula', 'p.leave':'Sair',
    'v.start':(v)=>`Vamos começar. ${v.n}. ${v.tip}`, 'v.rest':(v)=>`Pausa de ${v.s} segundos. A seguir, ${v.n}.`, 'v.ten':'Mais dez segundos.',
    'v.3':'Três', 'v.2':'Dois', 'v.1':'Um', 'v.prep':'Prepare-se.', 'v.half':'Metade. Mantenha o ritmo e respire.', 'v.half2':'Metade. Continue.', 'v.go':'Vamos lá.',
    'v.done':(v)=>`Aula concluída. Muito bem, ${v.name}! Você completou ${v.n} séries hoje.`, 'v.on':'Voz guia ligada.', 'v.onT':'Voz guia ligada', 'v.offT':'Voz guia desligada',
    'v.none':'Este navegador não tem voz disponível', 'v.listen':(v)=>`${v.n}. ${v.tip} Primeiro tempo: ${v.a}. Segundo tempo: ${v.b}.`,
    'd.title':'Aula concluída', 'd.p':(n)=>`${n}, você reservou esse tempo para você hoje. Isso já faz diferença.`, 'd.you':'Você',
    'd.min':'minutos', 'd.sets':'séries', 'd.streak':'dias seguidos', 'd.feel':'Como você se sente agora?',
    'm.calma':'Mais calma', 'm.energia':'Com energia', 'm.leve':'Corpo mais leve', 'm.cansada':'Foi puxado',
    'd.tough':(l)=>'Anotado. Se continuar puxado, vale testar o nível '+l+'.', 'd.noted':'Anotado. Vamos usar isso para ajustar suas próximas aulas.',
    'd.ask':'Sua resposta ajuda a ajustar as próximas aulas.', 'd.home':'Voltar ao início', 'd.prog':'Ver meu progresso',
    'x.title':'Explorar', 'x.level':'Seu nível', 'x.search':'Buscar', 'x.phEx':'Ex.: ponte, prancha, teaser', 'x.phCl':'Ex.: glúteos, postura, 10 min',
    'x.classes':(n)=>'Aulas · '+n, 'x.exs':(n)=>'Exercícios · '+n, 'x.all':'Todas', 'x.allF':'Todos', 'x.favs':'Favoritas',
    'x.noEx':'Nenhum exercício encontrado. Tente outra palavra ou outro foco.', 'x.mine':(n)=>'Do seu nível · '+n, 'x.other':(n)=>'Outros níveis · '+n,
    'x.noFav':'Toque no coração de uma aula para salvá-la aqui.', 'x.noCl':'Nenhuma aula encontrada. Tente outra palavra ou modalidade.',
    'x.forLevel':(l)=>'Para o nível '+l, 'x.adapted':'Outras aulas, adaptadas para você',
    'r.title':'Seu progresso', 'r.streak':'Sequência atual', 'r.best':'Maior sequência', 'r.minutes':(m)=>'Minutos em '+m, 'r.classes':'Aulas concluídas', 'r.level':'Seu nível',
    'r.ready':(l)=>'Pronta para o nível '+l+'?', 'r.toward':(l)=>'Rumo ao nível '+l,
    'r.readyTxt':(n)=>'Você completou '+n+' aulas neste nível. Experimente o próximo: você pode voltar quando quiser.',
    'r.towardTxt':(v)=>'Complete '+v.n+' aulas no nível '+v.l+' para receber a sugestão de subir.', 'r.of':(v)=>v.d+' de '+v.n+' aulas', 'r.try':(l)=>'Experimentar o nível '+l,
    'r.top':'Você está no nível mais alto', 'r.topTxt':'Use o Desafio clássico e o Abdômen avançado para variar e manter a evolução.', 'r.practiced':'Dia praticado',
    'r.badges':'Conquistas', 'r.first':'Primeira aula', 'r.seven':'7 dias seguidos', 'r.21':'21 dias seguidos', 'r.left':(n)=>'21 dias · faltam '+n,
    'r.rem':'Lembrete diário', 'r.remOn':(t)=>'Todos os dias às '+t, 'r.remTime':'Horário do lembrete', 'r.lang':'Idioma do app', 'r.langP':'Troque a qualquer momento. A voz guia muda junto.',
    't.created':(l)=>'Rotina criada para o nível '+l, 't.fav':'Salva nas suas favoritas', 't.unfav':'Removida das favoritas',
    't.level':(l)=>'Aulas adaptadas para o nível '+l, 't.levelNext':(l)=>'Nível '+l+' vale a partir da próxima aula',
    't.remOn':(t)=>'Lembrete ligado às '+t, 't.remOff':'Lembrete desligado', 't.rem':(t)=>'Lembrete às '+t, 't.lang':'App em português (Brasil)',
    'wk':['S','T','Q','Q','S','S','D'], 'calH':['D','S','T','Q','Q','S','S'], 'loc':'pt-BR'
  },
  en: {
    'w.title':'Pilates at home, every day', 'w.sub':(v)=>`${v.ex} exercises and ${v.cl} classes across ${v.mod} categories, adapted to your level and your cycle.`,
    'w.start':'Get started', 'w.login':'I already have an account', 'back':'Back',
    'g.top':'Personalize your classes', 'g.title':"Let's build your routine", 'g.sub':'Your answers shape your suggested classes and the pace of each exercise.',
    'g.name':'What should we call you?', 'g.goals':'What are your goals?', 'g.many':'Pick as many as you like', 'g.level':'Your Pilates level', 'g.time':'How much time per day?',
    'g.sum':(v)=>`${v.n===0?'No goals':v.n===1?'1 goal':v.n+' goals'} · ${v.l} · ${v.m} min a day`, 'g.create':'Create my routine',
    'timing':(v)=>`${v.w}s per exercise · ${v.r}s rest`,
    'h.morning':'Good morning', 'h.afternoon':'Good afternoon', 'h.evening':'Good evening', 'h.you':'there', 'days':(n)=>n===1?'1 day':n+' days',
    'h.level':(l)=>l+' level', 'h.week':'This week', 'h.today':"Today's class", 'h.doneToday':'Done today',
    'meta':(v)=>`${v.m} min · ${v.n} exercises`, 'rounds':(r)=>r===1?'1 round':r+' rounds', 'h.start':'Start class', 'h.again':'Do it again',
    'l1.eb':'Your beginner path', 'l1.t':'14-Day Fundamentals', 'l1.p':'Learn breathing, core engagement and alignment before you speed up.',
    'l2.eb':'Intermediate program', 'l2.t':'21-Day Core', 'l2.p':'The mat classics, a little more intense each week.',
    'l3.eb':'Challenge of the week', 'l3.t':'Master the Teaser', 'l3.p':"Pilates' signature move. See it step by step and train it in the Advanced Abs class.",
    'prog.day':(v)=>`Day ${v.d} of ${v.n}`, 'prog.btn':"Today's program class", 'see.ex':'See exercise', 'train':'Train',
    'h.mods':'Categories', 'h.seeAll':'See all', 'cy.k':'Your cycle · day 22 · luteal phase',
    'cy.p':'Your body asks for more calm in this phase. We picked gentler Pilates classes for this week.', 'cy.btn':'See classes for this phase', 'h.other':'For other moments',
    'tab.home':'Today', 'tab.explore':'Explore', 'tab.progress':'Progress', 'nav':'Main navigation',
    'sh.t':'Your level', 'sh.p':'Classes, exercise versions and timing all adjust to the level you choose.', 'close':'Close', 'fav':'Favorite',
    'c.favAdd':'Save to favorites', 'c.favRm':'Remove from favorites', 'c.ex':(n)=>n+' exercises',
    'c.adapt':(v)=>`<b>Adapted for ${v.l} level:</b> ${v.w}s of work and ${v.r}s of rest between exercises.`, 'c.swaps':'Swapped for versions that fit your level:',
    'c.dropped':(n)=>n===1?'1 advanced exercise was left out for now.':n+' advanced exercises were left out for now.',
    'c.change':'Change level', 'c.list':'Exercises in this class', 'c.tap':'Tap to preview', 'c.times':(v)=>`${v.n}× ${v.w}s`,
    'c.voice':'Voice coach', 'c.voiceOn':'Explains each exercise, guides your breathing and counts you down', 'off':'Off', 'c.start':(m)=>'Start class · '+m+' min',
    'e.listen':'Listen to instructions', 'e.t1':'Phase 1', 'e.t2':'Phase 2', 'e.lvl':'At your level',
    'e.lvlTxt':(v)=>v.fast?`${v.w} seconds per set, at a steady pace.`:`${v.w} seconds per set, about ${v.reps} reps.`,
    'e.versions':'Other versions', 'e.easier':'Easier', 'e.harder':'Harder', 'e.in':'Featured in these classes', 'anim':'Exercise animation',
    'p.exit':'Leave class', 'p.count':(v)=>`Exercise ${v.n} of ${v.t}`+(v.R>1?` · Round ${v.r}/${v.R}`:''), 'p.left':'left', 'p.restL':'rest',
    'p.rest':'Rest', 'p.restTip':'Breathe and get ready. ', 'p.next':'Up next', 'p.after':'After this', 'p.last':'Last set', 'p.lastTxt':'Then the class is done',
    'p.prev':'Previous exercise', 'p.pause':'Pause', 'p.resume':'Resume', 'p.nextB':'Next exercise', 'p.finish':'Finish class',
    'p.cueRest':(n)=>'Rest · next: '+n, 'p.paused':'Paused', 'p.breathe':'Breathe at your own pace',
    'p.exitT':'Leave this class?', 'p.exitP':"This class won't count toward your streak yet.", 'p.stay':'Keep going', 'p.leave':'Leave',
    'v.start':(v)=>`Let's begin. ${v.n}. ${v.tip}`, 'v.rest':(v)=>`Rest for ${v.s} seconds. Up next, ${v.n}.`, 'v.ten':'Ten more seconds.',
    'v.3':'Three', 'v.2':'Two', 'v.1':'One', 'v.prep':'Get ready.', 'v.half':'Halfway there. Keep the rhythm and breathe.', 'v.half2':'Halfway. Keep going.', 'v.go':"Let's go.",
    'v.done':(v)=>`Class complete. Great job, ${v.name}! You finished ${v.n} sets today.`, 'v.on':'Voice coach on.', 'v.onT':'Voice coach on', 'v.offT':'Voice coach off',
    'v.none':'No voice is available in this browser', 'v.listen':(v)=>`${v.n}. ${v.tip} Phase one: ${v.a}. Phase two: ${v.b}.`,
    'd.title':'Class complete', 'd.p':(n)=>`${n}, you made time for yourself today. That already makes a difference.`, 'd.you':'You',
    'd.min':'minutes', 'd.sets':'sets', 'd.streak':'day streak', 'd.feel':'How do you feel now?',
    'm.calma':'Calmer', 'm.energia':'Energized', 'm.leve':'Lighter', 'm.cansada':'That was tough',
    'd.tough':(l)=>'Noted. If it keeps feeling tough, try the '+l+' level.', 'd.noted':"Noted. We'll use this to adjust your next classes.",
    'd.ask':'Your answer helps us adjust your next classes.', 'd.home':'Back to home', 'd.prog':'See my progress',
    'x.title':'Explore', 'x.level':'Your level', 'x.search':'Search', 'x.phEx':'e.g. bridge, plank, teaser', 'x.phCl':'e.g. glutes, posture, 10 min',
    'x.classes':(n)=>'Classes · '+n, 'x.exs':(n)=>'Exercises · '+n, 'x.all':'All', 'x.allF':'All', 'x.favs':'Favorites',
    'x.noEx':'No exercises found. Try another word or focus.', 'x.mine':(n)=>'Your level · '+n, 'x.other':(n)=>'Other levels · '+n,
    'x.noFav':'Tap the heart on a class to save it here.', 'x.noCl':'No classes found. Try another word or category.',
    'x.forLevel':(l)=>'For '+l+' level', 'x.adapted':'More classes, adapted for you',
    'r.title':'Your progress', 'r.streak':'Current streak', 'r.best':'Longest streak', 'r.minutes':(m)=>'Minutes in '+m, 'r.classes':'Classes completed', 'r.level':'Your level',
    'r.ready':(l)=>'Ready for '+l+'?', 'r.toward':(l)=>'On your way to '+l,
    'r.readyTxt':(n)=>'You completed '+n+' classes at this level. Try the next one: you can switch back anytime.',
    'r.towardTxt':(v)=>'Complete '+v.n+' classes at the '+v.l+' level to get a suggestion to move up.', 'r.of':(v)=>v.d+' of '+v.n+' classes', 'r.try':(l)=>'Try '+l,
    'r.top':"You're at the highest level", 'r.topTxt':'Use the Classical Challenge and Advanced Abs classes to mix things up and keep progressing.', 'r.practiced':'Practiced',
    'r.badges':'Achievements', 'r.first':'First class', 'r.seven':'7-day streak', 'r.21':'21-day streak', 'r.left':(n)=>'21 days · '+n+' to go',
    'r.rem':'Daily reminder', 'r.remOn':(t)=>'Every day at '+t, 'r.remTime':'Reminder time', 'r.lang':'App language', 'r.langP':'Switch anytime. The voice coach switches too.',
    't.created':(l)=>'Routine created for '+l+' level', 't.fav':'Saved to your favorites', 't.unfav':'Removed from favorites',
    't.level':(l)=>'Classes adapted for '+l+' level', 't.levelNext':(l)=>l+' level applies from your next class',
    't.remOn':(t)=>'Reminder set for '+t, 't.remOff':'Reminder off', 't.rem':(t)=>'Reminder at '+t, 't.lang':'App in English (US)',
    'wk':['M','T','W','T','F','S','S'], 'calH':['S','M','T','W','T','F','S'], 'loc':'en-US'
  }
};
function t(k, v){ const d = STR[S.lang] || STR.pt; let s = d[k]; if (s === undefined) s = STR.pt[k]; return typeof s === 'function' ? s(v) : s; }
const tx = (o, f) => (S.lang === 'en' && o.en && o.en[f] !== undefined) ? o.en[f] : o[f];
const fmtTime = (hm) => { if (S.lang !== 'en') return hm; const p = hm.split(':'), h = Number(p[0]); return ((h % 12) || 12) + ':' + p[1] + ' ' + (h < 12 ? 'AM' : 'PM'); };

/* ---------------- Figure helpers ---------------- */
function poseAt(id, time, playing){
  const e = EX[id], ph = (time % e.period) / e.period; let k, cue;
  if (reduceMotion) { k = 1; cue = t('p.breathe'); }
  else if (ph < 0.5) { k = ease(ph * 2); cue = tx(e, 'cueAB'); }
  else { k = ease(1 - (ph - 0.5) * 2); cue = tx(e, 'cueBA'); }
  const p = mix(e.A, e.B, k, false);
  if (e.osc && !reduceMotion && playing) { const o = Math.sin(time * 2 * Math.PI * e.osc.hz) * e.osc.amp; e.osc.keys.forEach(key => { p[key] += o; }); }
  return { p, k, cue };
}
function paint(g, p){
  const sc = p.k || 1.2;
  g.setAttribute('transform', 'translate(' + f1(160 - 160 * sc) + ' ' + f1(205 - 192 * sc) + ') scale(' + sc.toFixed(3) + ')');
  g.innerHTML = figure(p);
}
function sceneSvg(gid, glowId){
  return `<svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${t('anim')}">
    <defs><clipPath id="${gid}Clip"><circle cx="160" cy="160" r="146"/></clipPath></defs>
    <circle cx="160" cy="160" r="155" fill="none" style="stroke:var(--plum-soft)" stroke-width="9"/>
    <g clip-path="url(#${gid}Clip)">
      <rect width="320" height="320" style="fill:var(--scene)"/>
      <circle id="${glowId}" cx="160" cy="130" r="64" style="fill:var(--scene-glow)"/>
      <rect y="205" width="320" height="28" style="fill:var(--scene-mat)"/>
      <g id="${gid}"></g>
    </g></svg>`;
}
function poseThumb(id){ return `<svg viewBox="${EX[id].thumb || '10 70 300 132'}" aria-hidden="true">${MAT}${figure(EX[id].B)}</svg>`; }
const TINTS = { sage:['--sage','--sage-mid','--sage-ink'], lilac:['--plum-soft','--lav','--plum'], peach:['--peach','--peach-mid','--peach-ink'], dusk:['--dusk','--dusk-mid','--plum-deep'], rose:['--rose','--rose-mid','--plum-deep'] };
function art(tint, pose){
  const c = TINTS[tint] || TINTS.sage;
  const fig = pose ? `<g transform="translate(62 14) scale(.98)"><rect x="18" y="192" width="284" height="8" rx="4" style="fill:var(--white)" opacity=".75"/>${figure(EX[pose].B)}</g>` : '';
  return `<svg class="art" viewBox="0 0 390 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="390" height="230" style="fill:var(${c[0]})"/>
    <circle cx="${pose?235:260}" cy="${pose?110:84}" r="${pose?78:46}" style="fill:var(${c[1]})" opacity=".6"/>
    <rect y="${pose?206:172}" width="390" height="60" style="fill:var(${c[1]})" opacity=".5"/>${fig}</svg>`;
}

/* ---------------- Levels, categories, classes ---------------- */
const LEVELS = {
  1:{ name:'Iniciante', d:'Nunca fiz Pilates ou faz tempo', work:30, rest:15, more:'Versões mais simples e pausas maiores', en:{ name:'Beginner', d:"New to Pilates, or it's been a while", more:'Simpler versions and longer breaks' } },
  2:{ name:'Intermediária', d:'Já conheço os exercícios básicos', work:40, rest:10, more:'Os clássicos do Pilates de solo', en:{ name:'Intermediate', d:'I know the basic moves', more:'The classical mat exercises' } },
  3:{ name:'Avançada', d:'Pratico com frequência', work:50, rest:5, more:'Repertório completo e desafios', en:{ name:'Advanced', d:'I practice regularly', more:'Full repertoire and challenges' } }
};
const lvName = (l) => tx(LEVELS[l], 'name');
const timing = (l) => t('timing', { w:LEVELS[l].work, r:LEVELS[l].rest });
const dots = (l) => `<span class="dots" aria-hidden="true"><i class="${l>=1?'on':''}"></i><i class="${l>=2?'on':''}"></i><i class="${l>=3?'on':''}"></i></span>`;
const lvBadge = (l) => `<span class="lv l${l}">${dots(l)}${lvName(l)}</span>`;
const FOCUS = { core:['Abdômen','Abs'], gluteos:['Glúteos','Glutes'], pernas:['Pernas','Legs'], superior:['Braços e costas','Arms & back'], postura:['Postura','Posture'], mobilidade:['Mobilidade','Mobility'], cardio:['Cardio','Cardio'] };
const focusName = (f) => FOCUS[f][S.lang === 'en' ? 1 : 0];
const MODS = [
  {id:'corpo', l:'Corpo todo', en:{l:'Full body'}, ic:'body', tint:'lilac'},
  {id:'core', l:'Abdômen', en:{l:'Abs'}, ic:'target', tint:'peach'},
  {id:'gluteos', l:'Glúteos', en:{l:'Glutes'}, ic:'bridgeI', tint:'rose'},
  {id:'pernas', l:'Pernas', en:{l:'Legs'}, ic:'legs', tint:'sage'},
  {id:'superior', l:'Braços e costas', en:{l:'Arms & back'}, ic:'arms', tint:'dusk'},
  {id:'postura', l:'Postura', en:{l:'Posture'}, ic:'spine', tint:'sage'},
  {id:'alongar', l:'Alongamento', en:{l:'Stretching'}, ic:'wave', tint:'dusk'},
  {id:'empe', l:'Pilates em pé', en:{l:'Standing'}, ic:'stand', tint:'peach'},
  {id:'cardio', l:'Cardio', en:{l:'Cardio'}, ic:'bolt', tint:'rose'},
  {id:'fundamentos', l:'Fundamentos', en:{l:'Fundamentals'}, ic:'ring', tint:'lilac'},
  {id:'ciclo', l:'Ciclo menstrual', en:{l:'Cycle syncing'}, ic:'drop', tint:'peach'},
  {id:'gestantes', l:'Gestação', en:{l:'Pregnancy'}, ic:'bump', tint:'rose'},
  {id:'relaxar', l:'Relaxar', en:{l:'Unwind'}, ic:'moon', tint:'dusk'}
];
const modTile = (m, pressed, act) => { const c = TINTS[m.tint]; return `<button type="button" class="mod" data-act="${act}" data-id="${m.id}" aria-pressed="${!!pressed}"><span class="ic" style="background:var(${c[0]});color:var(${c[2]})">${I[m.ic]}</span>${tx(m, 'l')}</button>`; };

const CLASSES = {
  essencial:{ title:'Corpo todo essencial', mod:'corpo', level:1, min:20, tint:'lilac', hero:'bridge',
    desc:'Um circuito que passa por abdômen, glúteos, pernas, braços e costas, com tempo para aprender cada movimento.',
    list:['warm','breathe','bridge','hundredTT','toeTaps','birddog','donkey','sidekick','squat','releve','kneePush','swan','catcow','spine'] },
  corpo30:{ title:'Corpo todo em 30', mod:'corpo', level:2, min:30, tint:'sage', hero:'teaser',
    desc:'Os clássicos do solo misturados com pernas e braços, em duas rodadas que deixam o corpo inteiro trabalhando.',
    list:['warm','hundred','rollup','singleleg','bridgeMarch','swimming','plank','lunge','squat','innerThigh','sidekick','tableTop','kneePush','singleKick','legCircles','mermaid','spine','child'] },
  classico:{ title:'Desafio clássico', mod:'corpo', level:3, min:30, tint:'dusk', hero:'teaser',
    desc:'A sequência clássica de Joseph Pilates, do Hundred ao Teaser, para quem já domina o básico.',
    list:['warm','hundred','rollup','rollover','legCircles','rollBall','singleleg','doubleleg','scissors','teaser','swan','swimming','sideDouble','sidePlank','pushup','bridgeSingle','tableTop','spine'] },
  express:{ title:'Corpo todo express', mod:'corpo', level:1, min:10, tint:'peach', hero:'squat',
    desc:'Dez minutos que cabem em qualquer pausa e ainda ativam o corpo inteiro.',
    list:['squat','bridge','birddog','sidekick','toeTaps','kneePush','spine'] },
  abdIni:{ title:'Abdômen para iniciantes', mod:'core', level:1, min:15, tint:'lilac', hero:'hundredTT',
    desc:'Aprenda a ativar o centro do corpo com segurança, sem forçar o pescoço nem a lombar.',
    list:['breathe','pelvic','toeTaps','deadbug','hundredTT','halfRoll','birddog','bridge','catcow','spine'] },
  coreAco:{ title:'Core de aço', mod:'core', level:2, min:20, tint:'dusk', hero:'hundred',
    desc:'Hundred, Roll Up e a série de alongamentos de perna, em circuito.',
    list:['hundred','rollup','singleleg','doubleleg','legCircles','rollBall','plank','climber','bridgeMarch','swimming','sidePlank','child'] },
  abdAva:{ title:'Abdômen avançado', mod:'core', level:3, min:20, tint:'lilac', hero:'scissors',
    desc:'Teaser, Rollover e Scissors: os exercícios mais exigentes do repertório de solo.',
    list:['hundred','scissors','teaser','rollover','doubleleg','legCircles','rollBall','sidePlank','plank','climber','pushup','child'] },
  glutCasa:{ title:'Glúteos em casa', mod:'gluteos', level:1, min:20, tint:'peach', hero:'bridge',
    desc:'Ponte, coice e elevações para fortalecer e definir os glúteos sem nenhum equipamento.',
    list:['bridge','pelvic','donkey','sidekick','squat','legLiftStand','releve','birddog','jacks','hamstring','child','spine'] },
  glutIntenso:{ title:'Glúteos intenso', mod:'gluteos', level:2, min:20, tint:'rose', hero:'singleKick',
    desc:'Variações mais difíceis de ponte e trabalho de lado para quem já sente o glúteo ativar.',
    list:['bridgeMarch','bridgeSingle','singleKick','innerThigh','sideDouble','lunge','squat','legLiftStand','swimming','tableTop','releve','child'] },
  pernas:{ title:'Pernas definidas', mod:'pernas', level:2, min:20, tint:'sage', hero:'lunge',
    desc:'Agachamento, afundo e trabalho de lado para coxas e panturrilhas.',
    list:['squat','lunge','releve','legLiftStand','innerThigh','sidekick','hamstring','legCircles','bridgeMarch','jacks','scissors','rolldown'] },
  bracosIni:{ title:'Braços e costas', mod:'superior', level:1, min:15, tint:'dusk', hero:'swan',
    desc:'Ombros, braços e costas mais fortes, com movimentos que também melhoram a postura.',
    list:['birddog','kneePush','swan','tableTop','catcow','plank','warm','child','rolldown','mermaid'] },
  bracos:{ title:'Braços firmes', mod:'superior', level:2, min:20, tint:'lilac', hero:'pushup',
    desc:'Prancha, flexão e mesa invertida para braços, ombros e o centro do corpo.',
    list:['plank','kneePush','tableTop','swimming','swan','sidePlank','pushup','climber','birddog','catcow','rolldown','child'] },
  postura10:{ title:'Postura no trabalho', mod:'postura', level:1, min:10, tint:'sage', hero:'catcow',
    desc:'Para desfazer horas de computador: abre o peito, alonga a coluna e ativa as costas.',
    list:['warm','rolldown','catcow','swan','birddog','spine','mermaid','child'] },
  costas:{ title:'Costas sem dor', mod:'postura', level:1, min:15, tint:'sage', hero:'birddog',
    desc:'Mobilidade e força para a lombar, com movimentos lentos e seguros.',
    list:['breathe','pelvic','catcow','birddog','child','hamstring','spine','bridge','rolldown','mermaid'] },
  alongamento:{ title:'Alongamento completo', mod:'alongar', level:1, min:15, tint:'dusk', hero:'mermaid',
    desc:'Coluna, quadril e posteriores de coxa mais soltos, no ritmo da respiração.',
    list:['rolldown','mermaid','spine','hamstring','catcow','child','breathe','legCircles','swan','warm'] },
  empe:{ title:'Pilates em pé', mod:'empe', level:1, min:15, tint:'peach', hero:'squat',
    desc:'Sem deitar no chão: equilíbrio, pernas e postura, ótimo para começar o dia.',
    list:['warm','squat','releve','legLiftStand','rolldown','jacks','lunge'] },
  empe2:{ title:'Em pé: pernas e equilíbrio', mod:'empe', level:2, min:20, tint:'sage', hero:'lunge',
    desc:'Afundos, elevações e equilíbrio em pé para pernas fortes e estáveis.',
    list:['warm','lunge','squat','legLiftStand','releve','jacks','rolldown'] },
  cardio:{ title:'Pilates cardio', mod:'cardio', level:2, min:15, tint:'peach', hero:'jacks',
    desc:'Ritmo mais acelerado para suar sem perder o controle dos movimentos.',
    list:['jacks','climber','squat','lunge','plank','bridgeMarch','singleKick','toeTaps','swimming','releve'] },
  queima:{ title:'Queima rápida', mod:'cardio', level:1, min:10, tint:'lilac', hero:'climber',
    desc:'Dez minutos para acelerar o coração com movimentos simples.',
    list:['jacks','squat','bridge','birddog','releve','toeTaps','donkey'] },
  fundamentos:{ title:'Fundamentos do Pilates', mod:'fundamentos', level:1, min:10, tint:'lilac', hero:'breathe',
    desc:'Respiração, ativação do centro e alinhamento: a base de todas as outras aulas.',
    list:['breathe','pelvic','toeTaps','catcow','bridge','deadbug','spine','child'] },
  tpm:{ title:'Pilates suave para a TPM', mod:'ciclo', level:1, min:12, tint:'peach', hero:'child',
    desc:'Movimentos leves para o quadril e a lombar nos dias de cólica, sem forçar o abdômen.',
    list:['breathe','pelvic','catcow','child','mermaid','hamstring','spine','bridge'] },
  gestacao:{ title:'Pilates na gestação', mod:'gestantes', level:1, min:15, tint:'rose', hero:'mermaid', fixed:true,
    desc:'Respiração, quadril e pernas com exercícios em pé, de lado e em quatro apoios, sem deitar de barriga para cima.',
    note:'Converse com sua obstetra antes de começar a praticar na gestação.',
    list:['warm','mermaid','catcow','birddog','sidekick','squat','legLiftStand','releve','rolldown'] },
  relaxar:{ title:'Relaxar antes de dormir', mod:'relaxar', level:1, min:10, tint:'dusk', hero:'child',
    desc:'Respiração lenta e alongamentos no chão para soltar o dia.',
    list:['breathe','hamstring','child','mermaid','spine','catcow','pelvic'] }
};
const CLASSES_EN = {
  essencial:['Full Body Essentials','A circuit through abs, glutes, legs, arms and back, with time to learn each move.'],
  corpo30:['Full Body in 30','Mat classics mixed with legs and arms, in two rounds that work your whole body.'],
  classico:['Classical Challenge',"Joseph Pilates' classical sequence, from the Hundred to the Teaser, for those who have mastered the basics."],
  express:['Full Body Express','Ten minutes that fit into any break and still wake up your whole body.'],
  abdIni:['Abs for Beginners','Learn to engage your core safely, without straining your neck or lower back.'],
  coreAco:['Core of Steel','The Hundred, Roll Up and the leg stretch series, as a circuit.'],
  abdAva:['Advanced Abs','Teaser, Rollover and Scissors: the most demanding moves in the mat repertoire.'],
  glutCasa:['Glutes at Home','Bridges, kickbacks and leg lifts to strengthen and tone your glutes with no equipment.'],
  glutIntenso:['Intense Glutes','Harder bridge variations and side-lying work for when you can already feel your glutes engage.'],
  pernas:['Toned Legs','Squats, lunges and side-lying work for your thighs and calves.'],
  bracosIni:['Arms and Back','Stronger shoulders, arms and back, with moves that also improve your posture.'],
  bracos:['Firm Arms','Plank, push-ups and reverse tabletop for your arms, shoulders and core.'],
  postura10:['Desk Posture Fix','Undo hours at the computer: open your chest, lengthen your spine and wake up your back.'],
  costas:['Back Pain Relief','Mobility and strength for your lower back, with slow and safe moves.'],
  alongamento:['Full-Body Stretch','A looser spine, hips and hamstrings, at the pace of your breath.'],
  empe:['Standing Pilates','No floor work: balance, legs and posture. A great way to start the day.'],
  empe2:['Standing: Legs and Balance','Lunges, lifts and standing balance for strong, stable legs.'],
  cardio:['Pilates Cardio','A faster pace to break a sweat without losing control of your moves.'],
  queima:['Quick Burn','Ten minutes to get your heart rate up with simple moves.'],
  fundamentos:['Pilates Fundamentals','Breathing, core engagement and alignment: the foundation of every other class.'],
  tpm:['Gentle Pilates for PMS','Light moves for your hips and lower back on cramp days, without straining your abs.'],
  gestacao:['Prenatal Pilates','Breathing, hips and legs with standing, side-lying and all-fours moves, never lying on your back.','Talk to your OB-GYN before you start exercising during pregnancy.'],
  relaxar:['Unwind Before Bed','Slow breathing and floor stretches to let go of the day.']
};
Object.keys(CLASSES_EN).forEach(c => { const x = CLASSES_EN[c]; CLASSES[c].en = { title:x[0], desc:x[1] }; if (x[2]) CLASSES[c].en.note = x[2]; });
const GOALS = [
  {id:'corpo', label:'Treinar o corpo todo', en:{label:'Train my whole body'}, cls:['essencial','corpo30','classico','express']},
  {id:'core', label:'Fortalecer o abdômen', en:{label:'Strengthen my core'}, cls:['abdIni','coreAco','abdAva']},
  {id:'gluteos', label:'Tonificar glúteos e pernas', en:{label:'Tone my glutes and legs'}, cls:['glutCasa','glutIntenso','pernas']},
  {id:'postura', label:'Melhorar a postura', en:{label:'Improve my posture'}, cls:['postura10','costas','bracosIni']},
  {id:'flex', label:'Ganhar flexibilidade', en:{label:'Gain flexibility'}, cls:['alongamento','relaxar']},
  {id:'tpm', label:'Aliviar cólica e TPM', en:{label:'Ease cramps and PMS'}, cls:['tpm']}
];

function adaptEx(id, lvl, fixed){
  let e = id; const seen = {};
  while (EX[e].level > lvl && EX[e].easy && !seen[e]) { seen[e] = 1; e = EX[e].easy; }
  if (EX[e].level > lvl) return null;
  if (!fixed) while (EX[e].hard && !seen[e] && EX[EX[e].hard].level <= lvl && EX[EX[e].hard].level > EX[e].level) { seen[e] = 1; e = EX[e].hard; }
  return e;
}
function buildPlan(cid, lvl){
  const C = CLASSES[cid], L = LEVELS[lvl], base = [], swaps = [];
  C.list.forEach(id => { const a = adaptEx(id, lvl, C.fixed); if (!a || base.indexOf(a) !== -1) return; if (a !== id) swaps.push([id, a]); base.push(a); });
  const slots = Math.max(base.length, Math.round(C.min * 60 / (L.work + L.rest)));
  const rounds = Math.ceil(slots / base.length), seq = [];
  for (let r = 1; r <= rounds; r++) base.forEach(id => { if (seq.length < slots) seq.push({ id, round: r }); });
  const secs = seq.length * L.work + (seq.length - 1) * L.rest;
  return { base, seq, rounds, swaps, work: L.work, rest: L.rest, min: Math.max(1, Math.round(secs / 60)) };
}

/* ---------------- State ---------------- */
function fresh(lang){
  return { lang: lang || 'pt', screen:'welcome', name:'Ana', goals:['corpo','core'], level:1, time:20, streak:12, best:18,
    todayDone:false, todayMinutes:0, sessions:6, favs:{}, voice:true, mood:null, tab:'aulas', mod:'todas', focus:'todos', query:'',
    reminder:true, reminderTime:'07:00', cls:'essencial', ex:'hundred', from:'home', exFrom:'explore', result:null, sheet:false };
}
let S = fresh();
let speed = 1;

const today = new Date(); today.setHours(0,0,0,0);
const DAY = 86400000;
const daysAgo = (d) => Math.round((today - d) / DAY);
function isDone(d){ const n = daysAgo(d); if (n === 0) return S.todayDone; if (n < 0) return false; return n <= (S.todayDone ? S.streak - 1 : S.streak); }
function recommended(){
  const ids = [];
  S.goals.forEach(g => { const G = GOALS.find(x => x.id === g); if (G) G.cls.forEach(c => { if (ids.indexOf(c) === -1) ids.push(c); }); });
  if (!ids.length) ids.push('essencial');
  let best = ids[0], score = 1e9;
  ids.forEach(c => { const C = CLASSES[c], sc = Math.abs(C.min - S.time) + 12 * Math.abs(C.level - S.level); if (sc < score) { score = sc; best = c; } });
  return best;
}
const greeting = () => { const h = new Date().getHours(); return t(h < 12 ? 'h.morning' : h < 18 ? 'h.afternoon' : 'h.evening'); };
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const mmss = (s) => { const r = Math.max(0, Math.ceil(s)); return Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0'); };

let toastTimer = null;
function toast(msg){ const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2400); }

/* ---------------- Shared pieces ---------------- */
function tabbar(cur){
  const b = (id, label, icon) => `<button type="button" data-go="${id}" ${cur===id?'aria-current="page"':''}>${icon}${label}</button>`;
  return `<nav class="tabbar" aria-label="${t('nav')}">${b('home',t('tab.home'),I.home)}${b('explore',t('tab.explore'),I.grid)}${b('progress',t('tab.progress'),I.chart)}</nav>`;
}
function langSwitch(short){
  return `<div class="seg2 two" role="group" aria-label="${t('r.lang')}"><button type="button" data-act="lang" data-id="pt" aria-pressed="${S.lang==='pt'}">${short ? 'PT' : 'Português (BR)'}</button><button type="button" data-act="lang" data-id="en" aria-pressed="${S.lang==='en'}">${short ? 'EN' : 'English (US)'}</button></div>`;
}
function levelSheet(){
  return `<div class="overlay" data-act="sheet-bg">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="lvT">
      <h2 id="lvT">${t('sh.t')}</h2>
      <p class="sub" style="font-size:14px">${t('sh.p')}</p>
      ${[1,2,3].map(l => `<button type="button" class="opt" data-act="setlevel" data-id="${l}" aria-pressed="${S.level===l}"><span class="radio"></span><span><b>${lvName(l)}</b><span class="d">${tx(LEVELS[l],'d')}</span><span class="t">${timing(l)} · ${tx(LEVELS[l],'more')}</span></span></button>`).join('')}
      <button type="button" class="btn ghost" data-act="sheet-close">${t('close')}</button>
    </div></div>`;
}
function classRow(cid){
  const C = CLASSES[cid], plan = buildPlan(cid, S.level);
  return `<button type="button" class="crow" data-act="open" data-id="${cid}"><span class="th">${art(C.tint, C.hero)}</span>
    <span class="tx"><b>${tx(C,'title')}</b><span class="small">${t('meta', {m:plan.min, n:plan.base.length})}</span><span>${lvBadge(C.level)}</span></span>
    ${S.favs[cid] ? `<span style="color:var(--plum)" aria-label="${t('fav')}">${I.heart(true)}</span>` : ''}<span style="color:var(--muted-2)">${I.chev}</span></button>`;
}
function exRow(id){
  const e = EX[id];
  return `<button type="button" class="crow" data-act="ex-open" data-id="${id}"><span class="thumb">${poseThumb(id)}</span>
    <span class="tx"><b>${tx(e,'name')}</b><span class="small">${e.focus.map(focusName).join(' · ')}</span><span>${lvBadge(e.level)}</span></span>
    <span style="color:var(--muted-2)">${I.chev}</span></button>`;
}

/* ---------------- Screens ---------------- */
function vWelcome(){
  return `<div class="screen">
    <div class="hero">
      <svg class="art" viewBox="0 0 390 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g class="breath"><circle cx="195" cy="230" r="118" style="fill:var(--sun)" opacity=".7"/>
        <circle cx="195" cy="230" r="158" fill="none" style="stroke:var(--sun)" stroke-width="1.5" opacity=".6"/></g>
        <rect y="384" width="390" height="96" style="fill:var(--lav)" opacity=".7"/>
        <g transform="translate(18 178) scale(1.12)"><rect x="18" y="192" width="284" height="8" rx="4" style="fill:var(--white)" opacity=".85"/>${figure(EX.teaser.B)}</g>
      </svg>
      <div class="logo">${I.brand}Aira</div>
      <div style="position:absolute;top:40px;right:16px;width:120px">${langSwitch(true)}</div>
    </div>
    <div style="flex:1;padding:26px 24px 30px;display:flex;flex-direction:column;gap:12px;min-height:0">
      <h1 class="h1" style="font-size:32px">${t('w.title')}</h1>
      <p class="sub">${t('w.sub', {ex:Object.keys(EX).length, cl:Object.keys(CLASSES).length, mod:MODS.length})}</p>
      <div style="margin-top:auto;display:flex;flex-direction:column;gap:6px">
        <button type="button" class="btn" data-go="goals">${t('w.start')}</button>
        <button type="button" class="btn ghost" data-go="home">${t('w.login')}</button>
      </div>
    </div>
  </div>`;
}

function vGoals(){
  return `<div class="screen">
    <div style="padding:36px 16px 0;display:flex;align-items:center;gap:8px;flex-shrink:0">
      <button type="button" class="iconbtn" style="background:transparent" data-go="welcome" aria-label="${t('back')}">${I.back}</button>
      <span class="small" style="font-weight:500">${t('g.top')}</span>
    </div>
    <div class="scroll"><div class="pad" style="padding-top:8px;gap:24px">
      <div style="display:flex;flex-direction:column;gap:6px"><h1 class="h1">${t('g.title')}</h1><p class="sub">${t('g.sub')}</p></div>
      <div class="field"><label for="nome">${t('g.name')}</label><input class="input" id="nome" type="text" autocomplete="given-name" maxlength="20" value="${esc(S.name)}"></div>
      <section style="display:flex;flex-direction:column;gap:12px">
        <h2 class="h2" style="font-size:15px">${t('g.goals')} <span style="font-weight:400;color:var(--muted)">${t('g.many')}</span></h2>
        <div class="chips">${GOALS.map(g => `<button type="button" class="chip" data-act="goal" data-id="${g.id}" aria-pressed="${S.goals.indexOf(g.id)!==-1}">${tx(g,'label')}</button>`).join('')}</div>
      </section>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2" style="font-size:15px">${t('g.level')}</h2>
        ${[1,2,3].map(l => `<button type="button" class="opt" data-act="level" data-id="${l}" aria-pressed="${S.level===l}"><span class="radio"></span><span><b>${lvName(l)}</b><span class="d">${tx(LEVELS[l],'d')}</span><span class="t">${timing(l)}</span></span></button>`).join('')}
      </section>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2" style="font-size:15px">${t('g.time')}</h2>
        <div class="grid4">${[10,15,20,30].map(m => `<button type="button" class="tbtn" data-act="time" data-id="${m}" aria-pressed="${S.time===m}">${m} min</button>`).join('')}</div>
      </section>
    </div></div>
    <div class="bottom">
      <p class="small" style="margin:0;text-align:center">${t('g.sum', {n:S.goals.length, l:lvName(S.level), m:S.time})}</p>
      <button type="button" class="btn" data-act="create">${t('g.create')}</button>
    </div>
  </div>`;
}

function levelCard(){
  if (S.level < 3){
    const n = S.level === 1 ? 14 : 21, d = Math.min(S.streak, n), k = 'l' + S.level;
    return `<section class="card progcard"><span class="eyebrow">${t(k+'.eb')}</span><h2 class="h2">${t(k+'.t')}</h2>
      <p class="small">${t(k+'.p')}</p>
      <span class="bar"><i style="width:${Math.round(d/n*100)}%"></i></span><span class="small strong">${t('prog.day', {d, n})}</span>
      <button type="button" class="btn sm" data-act="open" data-id="${S.level === 1 ? 'fundamentos' : 'coreAco'}">${t('prog.btn')}</button></section>`;
  }
  return `<section class="card progcard"><span class="eyebrow">${t('l3.eb')}</span><h2 class="h2">${t('l3.t')}</h2>
    <p class="small">${t('l3.p')}</p>
    <div class="grid2"><button type="button" class="btn line" data-act="ex-open" data-id="teaser">${t('see.ex')}</button><button type="button" class="btn sm" data-act="open" data-id="abdAva">${t('train')}</button></div></section>`;
}

function vHome(){
  const rec = recommended(), C = CLASSES[rec], plan = buildPlan(rec, S.level);
  const dateStr = cap1(new Date().toLocaleDateString(t('loc'), {weekday:'long', day:'numeric', month:'long'}));
  const dow = (today.getDay() + 6) % 7;
  const week = t('wk').map((l, i) => {
    const d = new Date(today.getTime() + (i - dow) * DAY), done = isDone(d), isToday = i === dow;
    return `<div class="wd"><span>${l}</span><span class="dot ${done?'done':''} ${isToday?'today':''}">${done?I.check:''}</span></div>`;
  }).join('');
  const quick = ['express','postura10','queima','relaxar'].filter(c => c !== rec).slice(0, 2);
  const qIcon = {express:[I.body,'--plum-soft','--plum'], postura10:[I.spine,'--sage','--sage-ink'], queima:[I.bolt,'--rose','--plum-deep'], relaxar:[I.moon,'--dusk','--plum-deep']};
  return `<div class="screen">
    <div class="scroll"><div class="pad">
      <header class="top">
        <div style="display:flex;flex-direction:column;gap:4px;min-width:0"><span class="small">${dateStr}</span><h1 class="h1">${greeting()}, ${esc(S.name || t('h.you'))}</h1></div>
        <span class="pill">${I.flame}${t('days', S.streak)}</span>
      </header>
      <div class="lvrow"><button type="button" class="lvchip" data-act="sheet">${dots(S.level)}${t('h.level', lvName(S.level))}${I.down}</button><span class="small">${timing(S.level)}</span></div>
      <section class="card week" aria-label="${t('h.week')}"><span class="small" style="font-weight:600">${t('h.week')}</span><div class="weekrow">${week}</div></section>
      <section class="card practice">
        <div class="cover">${art(C.tint, C.hero)}<span class="badge">${S.todayDone ? t('h.doneToday') : t('h.today')}</span></div>
        <div class="body">
          <div class="metarow"><span class="small">${t('meta', {m:plan.min, n:plan.base.length})}${plan.rounds>1?' · '+t('rounds', plan.rounds):''}</span>${lvBadge(C.level)}</div>
          <h3>${tx(C,'title')}</h3>
          <p class="sub" style="font-size:14px">${tx(C,'desc')}</p>
          <button type="button" class="btn" style="height:52px;margin-top:6px" data-act="open" data-id="${rec}">${I.play}${S.todayDone ? t('h.again') : t('h.start')}</button>
        </div>
      </section>
      ${levelCard()}
      <section style="display:flex;flex-direction:column;gap:12px">
        <div class="sechead"><h2 class="h2">${t('h.mods')}</h2><button type="button" class="link" data-act="mod-go" data-id="todas">${t('h.seeAll')} ${I.chev}</button></div>
        <div class="mods">${MODS.slice(0, 8).map(m => modTile(m, false, 'mod-go')).join('')}</div>
      </section>
      <section class="cycle"><span class="k">${t('cy.k')}</span><p>${t('cy.p')}</p>
        <button type="button" class="link" style="color:var(--peach-ink)" data-act="mod-go" data-id="ciclo">${t('cy.btn')} ${I.chev}</button></section>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2">${t('h.other')}</h2>
        <div class="grid2">${quick.map(c => `<button type="button" class="mini" data-act="open" data-id="${c}"><span class="ic" style="background:var(${qIcon[c][1]});color:var(${qIcon[c][2]})">${qIcon[c][0]}</span><b>${tx(CLASSES[c],'title')}</b><span class="small" style="font-size:12px">${buildPlan(c, S.level).min} min</span></button>`).join('')}</div>
      </section>
    </div></div>
    ${tabbar('home')}
    ${S.sheet ? levelSheet() : ''}
  </div>`;
}

function vClass(){
  const C = CLASSES[S.cls], fav = !!S.favs[S.cls], plan = buildPlan(S.cls, S.level), L = LEVELS[S.level];
  const times = (id) => plan.seq.filter(s => s.id === id).length;
  const dropped = C.list.filter(id => !adaptEx(id, S.level, C.fixed)).length;
  const swapTxt = plan.swaps.slice(0, 3).map(s => `<li>${tx(EX[s[0]],'name')} → ${tx(EX[s[1]],'name')}</li>`).join('');
  const note = tx(C, 'note');
  return `<div class="screen">
    <div class="scroll">
      <div class="dhero">${art(C.tint, C.hero)}
        <button type="button" class="iconbtn" style="left:16px" data-go="${S.from}" aria-label="${t('back')}">${I.back}</button>
        <button type="button" class="iconbtn" style="right:16px;color:var(--plum)" data-act="fav" aria-pressed="${fav}" aria-label="${fav ? t('c.favRm') : t('c.favAdd')}">${I.heart(fav)}</button>
      </div>
      <div class="pad" style="padding-top:20px;gap:16px">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="metarow">${lvBadge(C.level)}<span class="small">${tx(MODS.find(m => m.id === C.mod) || {l:''}, 'l')}</span></div>
          <h1 class="h1">${tx(C,'title')}</h1><p class="sub">${tx(C,'desc')}</p>
        </div>
        <div class="meta"><span class="m">${I.clock}${plan.min} min</span><span class="m">${t('c.ex', plan.base.length)}</span><span class="m">${I.layers}${t('rounds', plan.rounds)}</span></div>
        ${note ? `<p class="note">${note}</p>` : ''}
        <div class="adapt">
          <span>${t('c.adapt', {l:lvName(S.level), w:L.work, r:L.rest})}</span>
          ${swapTxt ? `<span>${t('c.swaps')}</span><ul>${swapTxt}</ul>` : ''}
          ${dropped ? `<span>${t('c.dropped', dropped)}</span>` : ''}
          <button type="button" class="link" style="min-height:36px" data-act="sheet">${t('c.change')} ${I.chev}</button>
        </div>
        <section style="display:flex;flex-direction:column;gap:2px">
          <div class="sechead"><h2 class="h2">${t('c.list')}</h2><span class="small">${t('c.tap')}</span></div>
          <div class="poses">${plan.base.map(id => `<button type="button" class="prow" data-act="ex-open" data-id="${id}"><span class="thumb">${poseThumb(id)}</span><span class="tx"><b>${tx(EX[id],'name')}</b><span class="small">${t('c.times', {n:times(id), w:L.work})}</span></span>${lvBadge(EX[id].level)}</button>`).join('')}</div>
        </section>
        <div class="card switchrow">
          <div style="display:flex;flex-direction:column;gap:2px"><b style="font-size:15px">${t('c.voice')}</b><span class="small">${S.voice ? t('c.voiceOn') : t('off')}</span></div>
          <button type="button" class="switch" data-act="voice" aria-pressed="${S.voice}" aria-label="${t('c.voice')}"><span></span></button>
        </div>
      </div>
    </div>
    <div class="bottom"><button type="button" class="btn" data-act="start" data-id="${S.cls}">${I.play}${t('c.start', plan.min)}</button></div>
    ${S.sheet ? levelSheet() : ''}
  </div>`;
}

function vExercise(){
  const e = EX[S.ex], W = LEVELS[S.level].work;
  const inClasses = Object.keys(CLASSES).filter(c => buildPlan(c, S.level).base.indexOf(S.ex) !== -1).slice(0, 4);
  return `<div class="screen">
    <div class="scroll">
      <div class="exstage">
        <button type="button" class="iconbtn" data-act="ex-back" aria-label="${t('back')}">${I.back}</button>
        ${sceneSvg('exFig', 'exGlow')}
        <div class="cue" style="bottom:0"><i></i><span id="exCue"></span></div>
      </div>
      <div class="pad" style="padding-top:18px;gap:16px">
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="metarow">${lvBadge(e.level)}<span class="small">${e.focus.map(focusName).join(' · ')}</span></div>
          <h1 class="h1">${tx(e,'name')}</h1><p class="sub">${tx(e,'tip')}</p>
        </div>
        <button type="button" class="btn line" data-act="ex-listen">${I.vol}${t('e.listen')}</button>
        <ul class="steps">
          <li><b>${t('e.t1')}</b><span>${tx(e,'cueAB')}</span></li>
          <li><b>${t('e.t2')}</b><span>${tx(e,'cueBA')}</span></li>
          <li><b>${t('e.lvl')}</b><span>${t('e.lvlTxt', {w:W, fast:e.period < 4, reps:Math.round(W / e.period)})}</span></li>
        </ul>
        ${(e.easy || e.hard) ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('e.versions')}</h2><div class="vers">
          ${e.easy ? `<button type="button" class="ver" data-act="ex-switch" data-id="${e.easy}"><small>${t('e.easier')}</small><b>${tx(EX[e.easy],'name')}</b></button>` : ''}
          ${e.hard ? `<button type="button" class="ver" data-act="ex-switch" data-id="${e.hard}"><small>${t('e.harder')}</small><b>${tx(EX[e.hard],'name')}</b></button>` : ''}
        </div></section>` : ''}
        ${inClasses.length ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('e.in')}</h2><div class="list">${inClasses.map(classRow).join('')}</div></section>` : ''}
      </div>
    </div>
  </div>`;
}

function vPlayer(){
  const C = CLASSES[S.cls];
  return `<div class="screen player">
    <div class="pbar">
      <button type="button" class="iconbtn" data-act="ask-exit" aria-label="${t('p.exit')}">${I.close}</button>
      <span class="t"><b>${tx(C,'title')}</b><span id="pCount"></span></span>
      <button type="button" class="iconbtn" id="pVoice" data-act="pvoice" aria-pressed="${S.voice}" aria-label="${t('c.voice')}" style="color:${S.voice ? 'var(--plum)' : 'var(--muted-2)'}">${S.voice ? I.vol : I.mute}</button>
    </div>
    <div class="ptrack" aria-hidden="true"><i id="pTrack"></i></div>
    <div class="stage" id="pStage">${sceneSvg('pFig', 'pGlow')}<div class="cue" aria-live="polite"><i id="pDot"></i><span id="pCue"></span></div></div>
    <div class="prow2">
      <div class="ring">
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle cx="44" cy="44" r="38" fill="none" style="stroke:var(--line)" stroke-width="7"/>
          <circle id="pRing" cx="44" cy="44" r="38" fill="none" style="stroke:var(--plum)" stroke-width="7" stroke-linecap="round" stroke-dasharray="238.8" stroke-dashoffset="0" transform="rotate(-90 44 44)"/>
        </svg>
        <span><em id="pTime" style="font-style:normal">0:00</em><small id="pTimeL">${t('p.left')}</small></span>
      </div>
      <div class="pinfo"><h1 id="pName"></h1><p id="pTip"></p></div>
    </div>
    <div class="upnext">${I.arrow}<div class="s"><small id="pNextL"></small><b id="pNext"></b></div></div>
    <div class="controls">
      <button type="button" class="cbtn" id="pPrev" data-act="prev" aria-label="${t('p.prev')}">${I.prev}</button>
      <button type="button" class="cbtn main" id="pPlay" data-act="toggle" aria-label="${t('p.pause')}">${I.pause}</button>
      <button type="button" class="cbtn" id="pNextB" data-act="next" aria-label="${t('p.nextB')}">${I.next}</button>
    </div>
    <div class="overlay" id="pExit" hidden>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="exitT">
        <h2 id="exitT">${t('p.exitT')}</h2><p class="sub">${t('p.exitP')}</p>
        <button type="button" class="btn" data-act="stay">${t('p.stay')}</button>
        <button type="button" class="btn ghost" data-act="exit">${t('p.leave')}</button>
      </div>
    </div>
  </div>`;
}

function vDone(){
  const r = S.result || {min:10, poses:10};
  const moods = ['calma','energia','leve','cansada'];
  return `<div class="screen">
    <div class="scroll"><div class="pad" style="padding-top:56px;gap:24px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center">
        <svg class="done-mark" viewBox="0 0 132 132" aria-hidden="true">
          <circle cx="66" cy="66" r="64" style="fill:var(--plum-soft)"/><circle cx="66" cy="66" r="46" style="fill:var(--plum)"/>
          <path d="M46 67l13 13 27-29" fill="none" style="stroke:var(--white)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1 class="h1" style="font-size:30px">${t('d.title')}</h1>
        <p class="sub" style="max-width:300px">${t('d.p', esc(S.name || t('d.you')))}</p>
      </div>
      <div class="grid3">
        <div class="stat"><b>${r.min}</b><span>${t('d.min')}</span></div>
        <div class="stat"><b>${r.poses}</b><span>${t('d.sets')}</span></div>
        <div class="stat warm"><b>${S.streak}</b><span>${t('d.streak')}</span></div>
      </div>
      <section style="display:flex;flex-direction:column;gap:12px">
        <h2 class="h2">${t('d.feel')}</h2>
        <div class="grid2">${moods.map(m => `<button type="button" class="tbtn" style="font-weight:500" data-act="mood" data-id="${m}" aria-pressed="${S.mood===m}">${t('m.' + m)}</button>`).join('')}</div>
        <p class="small" style="margin:0">${S.mood === 'cansada' && S.level > 1 ? t('d.tough', lvName(S.level - 1)) : S.mood ? t('d.noted') : t('d.ask')}</p>
      </section>
    </div></div>
    <div class="bottom">
      <button type="button" class="btn" data-go="home">${t('d.home')}</button>
      <button type="button" class="btn ghost" data-go="progress">${t('d.prog')}</button>
    </div>
  </div>`;
}

function exploreBody(){
  const q = norm(S.query.trim());
  if (S.tab === 'exercicios'){
    const ids = Object.keys(EX).filter(id => {
      const e = EX[id];
      if (S.focus !== 'todos' && e.focus.indexOf(S.focus) === -1) return false;
      if (q && norm(tx(e,'name') + ' ' + tx(e,'tip') + ' ' + e.name).indexOf(q) === -1) return false;
      return true;
    });
    if (!ids.length) return `<div class="empty">${t('x.noEx')}</div>`;
    const mine = ids.filter(id => EX[id].level === S.level), other = ids.filter(id => EX[id].level !== S.level).sort((a, b) => EX[a].level - EX[b].level);
    return `${mine.length ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('x.mine', mine.length)}</h2><div class="list">${mine.map(exRow).join('')}</div></section>` : ''}
      ${other.length ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('x.other', other.length)}</h2><div class="list">${other.map(exRow).join('')}</div></section>` : ''}`;
  }
  const ids = Object.keys(CLASSES).filter(c => {
    const C = CLASSES[c];
    if (S.mod === 'fav' && !S.favs[c]) return false;
    if (S.mod !== 'todas' && S.mod !== 'fav' && C.mod !== S.mod) return false;
    if (q && norm(tx(C,'title') + ' ' + tx(C,'desc') + ' ' + C.list.map(id => tx(EX[id],'name')).join(' ')).indexOf(q) === -1) return false;
    return true;
  });
  if (!ids.length) return `<div class="empty">${S.mod === 'fav' && !q ? t('x.noFav') : t('x.noCl')}</div>`;
  const mine = ids.filter(c => CLASSES[c].level === S.level), other = ids.filter(c => CLASSES[c].level !== S.level);
  return `${mine.length ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('x.forLevel', lvName(S.level))}</h2><div class="list">${mine.map(classRow).join('')}</div></section>` : ''}
    ${other.length ? `<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">${t('x.adapted')}</h2><div class="list">${other.map(classRow).join('')}</div></section>` : ''}`;
}
function vExplore(){
  const ex = S.tab === 'exercicios';
  const focusChips = [['todos', t('x.allF')]].concat(Object.keys(FOCUS).map(k => [k, focusName(k)]));
  return `<div class="screen">
    <div class="scroll"><div class="pad" style="gap:16px">
      <h1 class="h1">${t('x.title')}</h1>
      <div style="display:flex;flex-direction:column;gap:6px">
        <span class="small" style="font-weight:600">${t('x.level')}</span>
        <div class="seg2">${[1,2,3].map(l => `<button type="button" data-act="setlevel" data-id="${l}" aria-pressed="${S.level===l}">${lvName(l)}</button>`).join('')}</div>
        <span class="small">${timing(S.level)} · ${tx(LEVELS[S.level],'more')}</span>
      </div>
      <div class="search">${I.search}<label for="busca" style="position:absolute;left:-9999px">${t('x.search')}</label><input id="busca" type="search" placeholder="${ex ? t('x.phEx') : t('x.phCl')}" value="${esc(S.query)}"></div>
      <div class="seg2 two" role="tablist">
        <button type="button" role="tab" data-act="tab" data-id="aulas" aria-pressed="${!ex}" aria-selected="${!ex}">${t('x.classes', Object.keys(CLASSES).length)}</button>
        <button type="button" role="tab" data-act="tab" data-id="exercicios" aria-pressed="${ex}" aria-selected="${ex}">${t('x.exs', Object.keys(EX).length)}</button>
      </div>
      ${ex ? `<div class="chips row">${focusChips.map(f => `<button type="button" class="chip" data-act="focus" data-id="${f[0]}" aria-pressed="${S.focus===f[0]}">${f[1]}</button>`).join('')}</div>`
        : `<div class="mods">${modTile({id:'todas', l:t('x.all'), ic:'grid', tint:'lilac'}, S.mod==='todas', 'mod')}${MODS.map(m => modTile(m, S.mod===m.id, 'mod')).join('')}${modTile({id:'fav', l:t('x.favs'), ic:'logo', tint:'rose'}, S.mod==='fav', 'mod')}</div>`}
      <div id="exList" style="display:flex;flex-direction:column;gap:18px">${exploreBody()}</div>
    </div></div>
    ${tabbar('explore')}
  </div>`;
}

function vProgress(){
  const y = today.getFullYear(), m = today.getMonth(), first = new Date(y, m, 1), nDays = new Date(y, m + 1, 0).getDate();
  let cells = t('calH').map(d => `<span class="h">${d}</span>`).join('');
  for (let i = 0; i < first.getDay(); i++) cells += '<span></span>';
  let doneInMonth = 0;
  for (let d = 1; d <= nDays; d++){
    const done = isDone(new Date(y, m, d)), isT = d === today.getDate();
    if (done && !isT) doneInMonth++;
    cells += `<span class="d ${done?'done':''} ${isT?'today':''}">${d}</span>`;
  }
  const monthName = cap1(today.toLocaleDateString(t('loc'), {month:'long'}));
  const need = 10, done = Math.min(S.sessions, need), nextL = S.level < 3 ? lvName(S.level + 1) : null;
  const times = ['06:00','07:00','08:00','12:00','18:00','20:00','21:00'];
  return `<div class="screen">
    <div class="scroll"><div class="pad" style="gap:18px">
      <h1 class="h1">${t('r.title')}</h1>
      <div class="grid2">
        <div class="tile hi"><span>${t('r.streak')}</span><b>${t('days', S.streak)}</b></div>
        <div class="tile"><span>${t('r.best')}</span><b>${t('days', Math.max(S.best, S.streak))}</b></div>
        <div class="tile"><span>${t('r.minutes', S.lang === 'en' ? monthName : monthName.toLowerCase())}</span><b>${doneInMonth * 18 + S.todayMinutes}</b></div>
        <div class="tile"><span>${t('r.classes')}</span><b>${18 + S.sessions}</b></div>
      </div>
      <section class="card progcard">
        <div class="sechead"><span class="eyebrow">${t('r.level')}</span>${lvBadge(S.level)}</div>
        ${nextL ? `<h2 class="h2">${done >= need ? t('r.ready', nextL) : t('r.toward', nextL)}</h2>
          <p class="small">${done >= need ? t('r.readyTxt', need) : t('r.towardTxt', {n:need, l:lvName(S.level)})}</p>
          <span class="bar"><i style="width:${Math.round(done/need*100)}%"></i></span><span class="small strong">${t('r.of', {d:done, n:need})}</span>
          ${done >= need ? `<button type="button" class="btn sm" data-act="setlevel" data-id="${S.level + 1}">${t('r.try', nextL)}</button>` : ''}`
        : `<h2 class="h2">${t('r.top')}</h2><p class="small">${t('r.topTxt')}</p>`}
        <button type="button" class="link" style="min-height:36px" data-act="sheet">${t('c.change')} ${I.chev}</button>
      </section>
      <section class="card progcard">
        <div class="sechead"><span class="eyebrow">${t('r.lang')}</span><span style="color:var(--plum)">${I.globe}</span></div>
        ${langSwitch(false)}
        <p class="small">${t('r.langP')}</p>
      </section>
      <section class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px">
        <div class="sechead"><h2 class="h2">${monthName} ${y}</h2><span class="small" style="display:flex;align-items:center;gap:6px;font-size:12px"><span style="width:10px;height:10px;border-radius:5px;background:var(--plum)"></span>${t('r.practiced')}</span></div>
        <div class="cal">${cells}</div>
      </section>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2">${t('r.badges')}</h2>
        <div class="badges">
          <div class="bdg"><span class="ic" style="background:var(--plum-soft);color:var(--plum)">${I.logo}</span>${t('r.first')}</div>
          <div class="bdg"><span class="ic" style="background:var(--peach);color:var(--peach-ink)">${I.flameL}</span>${t('r.seven')}</div>
          ${S.streak < 21 ? `<div class="bdg locked"><span class="ic" style="background:var(--white);color:var(--muted-2)">${I.lock}</span>${t('r.left', 21 - S.streak)}</div>` : `<div class="bdg"><span class="ic" style="background:var(--sage);color:var(--sage-ink)">${I.flameL}</span>${t('r.21')}</div>`}
        </div>
      </section>
      <section class="card remind">
        <div class="r1">
          <span style="width:40px;height:40px;flex-shrink:0;border-radius:12px;background:var(--plum-soft);color:var(--plum);display:flex;align-items:center;justify-content:center">${I.bell}</span>
          <div style="flex:1;display:flex;flex-direction:column;gap:2px"><b style="font-size:15px">${t('r.rem')}</b><span class="small">${S.reminder ? t('r.remOn', fmtTime(S.reminderTime)) : t('off')}</span></div>
          <button type="button" class="switch" data-act="reminder" aria-pressed="${S.reminder}" aria-label="${t('r.rem')}"><span></span></button>
        </div>
        ${S.reminder ? `<div class="field"><label for="hora">${t('r.remTime')}</label><select id="hora">${times.map(h => `<option value="${h}" ${h===S.reminderTime?'selected':''}>${fmtTime(h)}</option>`).join('')}</select></div>` : ''}
      </section>
    </div></div>
    ${tabbar('progress')}
    ${S.sheet ? levelSheet() : ''}
  </div>`;
}

const VIEWS = { welcome:vWelcome, goals:vGoals, home:vHome, class:vClass, exercise:vExercise, player:vPlayer, done:vDone, explore:vExplore, progress:vProgress };

function render(keepScroll){
  const prev = app.querySelector('.scroll');
  const top = keepScroll && prev ? prev.scrollTop : 0;
  app.setAttribute('lang', S.lang === 'en' ? 'en-US' : 'pt-BR');
  app.innerHTML = VIEWS[S.screen]();
  const sc = app.querySelector('.scroll');
  if (sc && top) sc.scrollTop = top;
  if (S.screen !== 'player') stopPlayer();
  if (S.screen === 'exercise') startPreview(); else stopPreview();
  syncPanel();
}
function go(screen){ S.sheet = false; if (S.screen === screen) { render(true); return; } S.screen = screen; render(false); }
function syncPanel(){
  document.querySelectorAll('#plevel button').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.id) === S.level)));
  document.querySelectorAll('#plang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === S.lang)));
}

/* ---------------- Voice coach ----------------
   Uses the device's own voices: a Brazilian Portuguese voice in Portuguese, a US English voice in English. */
const HAS_VOICE = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
const VOICE = { pt:null, en:null };
function pickVoices(){
  try {
    const vs = window.speechSynthesis.getVoices();
    const pick = (re, prefer) => { const pool = vs.filter(v => re.test(v.lang)); return pool.find(v => prefer.test(v.name)) || pool[0] || null; };
    VOICE.pt = pick(/^pt[-_]?BR/i, /luciana|francisca|thalita|vit[oó]ria|natural|neural|google/i) || pick(/^pt/i, /./);
    VOICE.en = pick(/^en[-_]?US/i, /samantha|ava|allison|zoe|jenny|aria|natural|neural|google us/i) || pick(/^en/i, /./);
  } catch (e) {}
}
if (HAS_VOICE) { pickVoices(); try { window.speechSynthesis.addEventListener('voiceschanged', pickVoices); } catch (e) {} }
function hush(){ if (HAS_VOICE) try { window.speechSynthesis.cancel(); } catch (e) {} }
function speak(text, opt){
  opt = opt || {};
  if ((!S.voice && !opt.force) || !HAS_VOICE) return;
  try {
    const ss = window.speechSynthesis;
    if (opt.ifIdle && (ss.speaking || ss.pending)) return;
    if (!opt.queue) ss.cancel();
    const u = new SpeechSynthesisUtterance(text), en = S.lang === 'en';
    u.lang = en ? 'en-US' : 'pt-BR';
    const v = en ? VOICE.en : VOICE.pt; if (v) u.voice = v;
    u.rate = opt.rate || 1; u.pitch = 1.05;
    ss.speak(u);
  } catch (e) {}
}
const firstSentence = (s) => (s.match(/^[^.!?]*[.!?]/) || [s])[0];

/* ---------------- Exercise preview loop ---------------- */
const PV = { raf:null, last:0, anim:0 };
function startPreview(){
  stopPreview(); PV.last = performance.now(); PV.anim = 0;
  const step = (now) => {
    const g = document.getElementById('exFig');
    if (S.screen !== 'exercise' || !g) { PV.raf = null; return; }
    const dt = Math.min(0.1, (now - PV.last) / 1000); PV.last = now; PV.anim += dt;
    const r = poseAt(S.ex, PV.anim, true);
    paint(g, r.p);
    document.getElementById('exGlow').setAttribute('r', (54 + 22 * r.k).toFixed(1));
    const c = document.getElementById('exCue'); if (c.textContent !== r.cue) c.textContent = r.cue;
    PV.raf = requestAnimationFrame(step);
  };
  PV.raf = requestAnimationFrame(step);
}
function stopPreview(){ if (PV.raf) { cancelAnimationFrame(PV.raf); PV.raf = null; } }

/* ---------------- Player engine ---------------- */
const PL = { phase:-1, said:{}, items:[], i:0, remain:0, dur:0, playing:true, anim:0, blendFrom:null, blendT:1, current:null, raf:null, last:0, cue:'', total:0, before:0, plan:null, nEx:0 };
function voiceEvents(){
  if (!S.voice || !PL.playing || speed > 1) return;
  const it = PL.items[PL.i], e = EX[it.id], el = PL.dur - PL.remain, said = PL.said;
  if (it.type === 'ex'){
    const quiet = PL.remain < 4.5 || (PL.remain < 11.5 && PL.remain > 8.5);
    if (e.period >= 4 && el > 5 && !quiet) {
      const ph = Math.floor(PL.anim / (e.period / 2));
      if (ph !== PL.phase) { PL.phase = ph; speak(tx(e, ph % 2 === 0 ? 'cueAB' : 'cueBA'), {ifIdle:true}); }
    } else if (e.period < 4 && !said.half && el >= PL.dur / 2) { said.half = 1; speak(t(PL.dur >= 40 ? 'v.half' : 'v.half2'), {ifIdle:true}); }
    if (PL.dur >= 30 && !said.ten && PL.remain <= 10.4) { said.ten = 1; speak(t('v.ten')); }
    [3, 2, 1].forEach(n => { if (!said['c' + n] && PL.remain <= n + 0.1 && PL.remain > n - 0.9) { said['c' + n] = 1; speak(t('v.' + n), {rate:1.1}); } });
  } else if (!said.prep && PL.remain <= 4 && PL.dur > 5) { said.prep = 1; speak(t('v.prep')); }
}
function startClass(id){
  S.cls = id; S.sheet = false; stopPreview();
  const plan = buildPlan(id, S.level); PL.plan = plan; PL.items = [];
  plan.seq.forEach((s, idx) => {
    PL.items.push({ type:'ex', id:s.id, dur:plan.work, n:idx + 1, round:s.round });
    if (idx < plan.seq.length - 1) PL.items.push({ type:'rest', id:plan.seq[idx + 1].id, dur:plan.rest, n:idx + 2, round:plan.seq[idx + 1].round });
  });
  PL.total = PL.items.reduce((a, b) => a + b.dur, 0); PL.nEx = plan.seq.length;
  PL.playing = true; PL.current = null; S.screen = 'player';
  app.setAttribute('lang', S.lang === 'en' ? 'en-US' : 'pt-BR');
  app.innerHTML = vPlayer(); syncPanel();
  setItem(0); startLoop();
}
function nextExIndex(from){ for (let j = from + 1; j < PL.items.length; j++) if (PL.items[j].type === 'ex') return j; return -1; }
function setItem(i, silent){
  const it = PL.items[i], e = EX[it.id], rest = it.type === 'rest', q = (x) => document.getElementById(x), name = tx(e, 'name'), tip = tx(e, 'tip');
  PL.i = i; PL.dur = it.dur; PL.remain = it.dur; PL.anim = 0; PL.cue = ''; PL.phase = -1; PL.said = {};
  PL.blendFrom = PL.current; PL.blendT = PL.current ? 0 : 1;
  PL.before = PL.items.slice(0, i).reduce((a, b) => a + b.dur, 0);
  if (!q('pName')) return;
  q('pName').textContent = rest ? t('p.rest') : name;
  q('pTip').textContent = rest ? t('p.restTip') + tip : tip;
  q('pCount').textContent = t('p.count', {n:it.n, t:PL.nEx, r:it.round, R:PL.plan.rounds});
  q('pTimeL').textContent = rest ? t('p.restL') : t('p.left');
  q('pStage').classList.toggle('rest', rest);
  const nx = nextExIndex(i);
  if (rest) { q('pNextL').textContent = t('p.next'); q('pNext').textContent = name; }
  else if (nx !== -1) { q('pNextL').textContent = t('p.after'); q('pNext').textContent = tx(EX[PL.items[nx].id], 'name'); }
  else { q('pNextL').textContent = t('p.last'); q('pNext').textContent = t('p.lastTxt'); }
  q('pPrev').disabled = it.n === 1;
  q('pNextB').setAttribute('aria-label', nx !== -1 ? t('p.nextB') : t('p.finish'));
  if (!silent && speed < 10) {
    if (rest) speak(t('v.rest', {s:it.dur, n:name}));
    else if (i === 0) speak(t('v.start', {n:name, tip}));
    else speak(name + '. ' + (PL.items[i - 1].type === 'rest' ? firstSentence(tip) : tip));
  }
}
function startLoop(){
  if (PL.raf) cancelAnimationFrame(PL.raf);
  PL.last = performance.now();
  const step = (now) => {
    if (S.screen !== 'player' || !document.getElementById('pFig')) { PL.raf = null; return; }
    const dt = Math.min(0.1, (now - PL.last) / 1000); PL.last = now;
    if (PL.playing){
      PL.anim += dt; PL.remain -= dt * speed;
      if (PL.remain <= 0) { advance(); if (S.screen !== 'player') { PL.raf = null; return; } }
      else voiceEvents();
    }
    PL.blendT = Math.min(1, PL.blendT + dt / 0.9);
    draw();
    PL.raf = requestAnimationFrame(step);
  };
  PL.raf = requestAnimationFrame(step);
}
function stopPlayer(){ if (PL.raf) { cancelAnimationFrame(PL.raf); PL.raf = null; } hush(); }
function draw(){
  const it = PL.items[PL.i]; let target, cue, k;
  if (it.type === 'rest') { target = Object.assign({}, EX[it.id].A); k = 0.3; cue = t('p.cueRest', tx(EX[it.id], 'name')); }
  else { const r = poseAt(it.id, PL.anim, PL.playing); target = r.p; k = r.k; cue = r.cue; }
  const params = (PL.blendFrom && PL.blendT < 1) ? mix(PL.blendFrom, target, ease(PL.blendT), true) : target;
  PL.current = params;
  paint(document.getElementById('pFig'), params);
  document.getElementById('pGlow').setAttribute('r', (54 + 22 * k).toFixed(1));
  document.getElementById('pDot').style.transform = 'scale(' + (0.7 + 0.6 * k).toFixed(2) + ')';
  if (!PL.playing) cue = t('p.paused');
  if (cue !== PL.cue) { PL.cue = cue; document.getElementById('pCue').textContent = cue; }
  document.getElementById('pTime').textContent = mmss(PL.remain);
  document.getElementById('pRing').setAttribute('stroke-dashoffset', (238.8 * (1 - PL.remain / PL.dur)).toFixed(1));
  document.getElementById('pTrack').style.width = (100 * (PL.before + PL.dur - PL.remain) / PL.total).toFixed(2) + '%';
}
function advance(){ if (PL.i < PL.items.length - 1) setItem(PL.i + 1); else finish(); }
function finish(){
  stopPlayer();
  const m = Math.max(1, Math.round(PL.total / 60));
  if (!S.todayDone) { S.todayDone = true; S.streak += 1; }
  S.best = Math.max(S.best, S.streak);
  S.todayMinutes += m; S.sessions += 1; S.mood = null;
  S.result = { min:m, poses:PL.nEx };
  S.screen = 'done'; render(false);
  speak(t('v.done', {name:S.name || t('d.you'), n:PL.nEx}));
}
function setPlaying(on, quiet){
  PL.playing = on;
  const b = document.getElementById('pPlay');
  if (b) { b.innerHTML = on ? I.pause : I.playBig; b.setAttribute('aria-label', on ? t('p.pause') : t('p.resume')); }
  PL.cue = ''; PL.phase = -1;
  if (quiet) return;
  if (on) speak(t('v.go')); else hush();
}
function setLevel(l){
  if (S.level === l) { S.sheet = false; if (S.screen !== 'player') render(true); return; }
  S.level = l; S.sheet = false;
  if (S.screen !== 'player') render(true); else syncPanel();
  toast(S.screen === 'player' ? t('t.levelNext', lvName(l)) : t('t.level', lvName(l)));
}
function setLang(l){
  if (S.lang === l) return;
  S.lang = l; hush();
  if (S.screen === 'player') {
    /* rebuild the class screen in the new language, keeping the place in the class */
    const keep = { i:PL.i, remain:PL.remain, anim:PL.anim, playing:PL.playing, cur:PL.current };
    app.setAttribute('lang', l === 'en' ? 'en-US' : 'pt-BR');
    app.innerHTML = vPlayer(); setItem(keep.i, true);
    PL.remain = keep.remain; PL.anim = keep.anim; PL.current = keep.cur; PL.blendT = 1;
    setPlaying(keep.playing, true); syncPanel();
  } else render(true);
  toast(t('t.lang'));
}

/* ---------------- Events ---------------- */
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('overlay') && e.target.dataset.act === 'sheet-bg') { S.sheet = false; render(true); return; }
  const el = e.target.closest('[data-go],[data-act],[data-speed]');
  if (!el || el.dataset.act === 'sheet-bg') return;
  if (el.dataset.speed) {
    speed = Number(el.dataset.speed);
    document.querySelectorAll('#speed button').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
    return;
  }
  if (el.dataset.go) { if (S.screen === 'player') stopPlayer(); go(el.dataset.go); return; }
  const id = el.dataset.id;
  switch (el.dataset.act) {
    case 'goal': { const i = S.goals.indexOf(id); if (i === -1) S.goals.push(id); else S.goals.splice(i, 1); render(true); break; }
    case 'level': S.level = Number(id); render(true); break;
    case 'time': S.time = Number(id); render(true); break;
    case 'create': go('home'); toast(t('t.created', lvName(S.level))); break;
    case 'open':
      if (S.screen === 'player') stopPlayer();
      if (S.screen !== 'class' && S.screen !== 'exercise') S.from = ['home','explore','progress'].indexOf(S.screen) !== -1 ? S.screen : 'home';
      S.cls = id; S.sheet = false; S.screen = 'class'; render(false); break;
    case 'ex-open':
      if (S.screen === 'player') stopPlayer();
      S.exFrom = S.screen === 'class' ? 'class' : (['home','explore','progress'].indexOf(S.screen) !== -1 ? S.screen : 'explore');
      S.ex = id; S.screen = 'exercise'; render(false); break;
    case 'ex-switch': hush(); S.ex = id; render(false); break;
    case 'ex-back': hush(); S.screen = S.exFrom; render(false); break;
    case 'ex-listen': { const x = EX[S.ex]; if (!HAS_VOICE) { toast(t('v.none')); break; } speak(t('v.listen', {n:tx(x,'name'), tip:tx(x,'tip'), a:tx(x,'cueAB'), b:tx(x,'cueBA')}), {force:true}); break; }
    case 'library': if (S.screen === 'player') stopPlayer(); S.tab = 'exercicios'; S.query = ''; go('explore'); break;
    case 'fav': S.favs[S.cls] = !S.favs[S.cls]; render(true); toast(t(S.favs[S.cls] ? 't.fav' : 't.unfav')); break;
    case 'voice': S.voice = !S.voice; render(true); if (!HAS_VOICE) toast(t('v.none')); else if (S.voice) speak(t('v.on')); else hush(); break;
    case 'pvoice':
      S.voice = !S.voice; el.setAttribute('aria-pressed', String(S.voice)); el.innerHTML = S.voice ? I.vol : I.mute; el.style.color = S.voice ? 'var(--plum)' : 'var(--muted-2)';
      if (!HAS_VOICE) toast(t('v.none')); else if (S.voice) { speak(t('v.on')); toast(t('v.onT')); } else { hush(); toast(t('v.offT')); }
      break;
    case 'start': startClass(id || S.cls); break;
    case 'toggle': setPlaying(!PL.playing); break;
    case 'prev': {
      let j = -1; const cur = PL.items[PL.i];
      for (let k = PL.i - 1; k >= 0; k--) if (PL.items[k].type === 'ex' && (cur.type === 'rest' || PL.items[k].n < cur.n)) { j = k; break; }
      if (j !== -1) setItem(j); break;
    }
    case 'next': { const j = nextExIndex(PL.i); if (j === -1) finish(); else setItem(j); break; }
    case 'ask-exit': setPlaying(false); document.getElementById('pExit').hidden = false; break;
    case 'stay': document.getElementById('pExit').hidden = true; setPlaying(true); break;
    case 'exit': stopPlayer(); S.screen = 'class'; render(false); break;
    case 'mood': S.mood = id; render(true); break;
    case 'tab': S.tab = id; S.query = ''; render(true); break;
    case 'mod': S.mod = id; render(true); break;
    case 'focus': S.focus = id; render(true); break;
    case 'mod-go': S.tab = 'aulas'; S.mod = id; S.query = ''; go('explore'); break;
    case 'sheet': S.sheet = true; render(true); break;
    case 'sheet-close': S.sheet = false; render(true); break;
    case 'setlevel': setLevel(Number(id)); break;
    case 'lang': setLang(id); break;
    case 'reminder': S.reminder = !S.reminder; render(true); toast(S.reminder ? t('t.remOn', fmtTime(S.reminderTime)) : t('t.remOff')); break;
    case 'reset': stopPlayer(); stopPreview(); S = fresh(S.lang); render(false); break;
  }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'nome') S.name = e.target.value.trim();
  if (e.target.id === 'busca') { S.query = e.target.value; const l = document.getElementById('exList'); if (l) l.innerHTML = exploreBody(); }
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'hora') { S.reminderTime = e.target.value; render(true); toast(t('t.rem', fmtTime(S.reminderTime))); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && S.screen === 'player' && PL.playing) setPlaying(false); });

render(false);
