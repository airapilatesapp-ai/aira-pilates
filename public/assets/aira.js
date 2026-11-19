/* Shared helpers for the Aira pages: settings, language, and the Supabase login client. */
(function () {
  'use strict';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };

  let cfgPromise = null;
  function config() {
    if (!cfgPromise) {
      cfgPromise = fetch('/api/config', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error('config ' + r.status); return r.json(); })
        .then((c) => { store.set('aira.cfg', JSON.stringify(c)); return c; })
        .catch(() => { const c = store.get('aira.cfg'); return c ? JSON.parse(c) : {}; });
    }
    return cfgPromise;
  }

  let sbPromise = null;
  function supabase() {
    if (!sbPromise) {
      sbPromise = config().then((c) => {
        if (!c.supabaseUrl || !c.supabaseKey || !window.supabase) throw new Error('Login is not configured yet');
        return window.supabase.createClient(c.supabaseUrl, c.supabaseKey, {
          auth: { flowType: 'implicit', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'aira-auth' },
        });
      });
    }
    return sbPromise;
  }

  function lang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'pt' || q === 'en') { store.set('aira.lang', q); return q; }
    const saved = store.get('aira.lang');
    if (saved === 'pt' || saved === 'en') return saved;
    return /^pt/i.test(navigator.language || '') ? 'pt' : 'en';
  }
  function setLang(l) { store.set('aira.lang', l); }

  // Fills every [data-i18n] element from a {pt:{}, en:{}} dictionary and wires the PT/EN buttons.
  function translatePage(dict, onChange) {
    const apply = (l) => {
      const d = dict[l] || dict.en;
      document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en-US';
      document.querySelectorAll('[data-i18n]').forEach((el) => { const v = d[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v; });
      document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(';').forEach((pair) => { const [attr, key] = pair.split(':'); if (d[key] !== undefined) el.setAttribute(attr, d[key]); });
      });
      document.querySelectorAll('[data-lang-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.langBtn === l)));
      if (d.__title) document.title = d.__title;
      if (onChange) onChange(l, d);
    };
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-lang-btn]');
      if (!b) return;
      setLang(b.dataset.langBtn); apply(b.dataset.langBtn);
    });
    const l = lang(); apply(l); return l;
  }


  /* Brazilian prices. Used only when the site is in Portuguese and both reais checkout links exist,
     so Portuguese visitors without those links still see the dollar prices they would pay. */
  const BRL = [
    [/US\$(&nbsp;|\s)?49,99/g, 'R$$$1149,90'], [/US\$(&nbsp;|\s)?9,99/g, 'R$$$119,90'],
    [/US\$(&nbsp;|\s)?4,17/g, 'R$$$112,49'], [/US\$(&nbsp;|\s)?0\b/g, 'R$$$10'], [/Economize 58%/g, 'Economize 37%'],
  ];
  const hasBR = (c) => !!(c && c.linkMonthlyBR && c.linkYearlyBR);
  function toBRL(dict) {
    const conv = (v) => typeof v === 'string' ? BRL.reduce((t, [re, to]) => t.replace(re, to), v) : Array.isArray(v) ? v.map(conv) : v;
    Object.keys(dict).forEach((k) => { dict[k] = conv(dict[k]); });
  }

  window.Aira = { store, config, supabase, lang, setLang, translatePage, hasBR, toBRL };
})();
