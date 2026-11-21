/* Meta (Facebook / Instagram) Pixel, used to measure and improve our ads.
   Loaded only on the website pages (home, quiz, sales page, welcome), never inside the app.
   It sends page views and three steps: Lead (e-mail in the quiz), InitiateCheckout and StartTrial.
   Quiz answers are never sent, and automatic button and page scanning is turned off.
   Visitors who opt out on the privacy page, or whose browser sends Global Privacy Control, get no pixel. */
(function () {
  'use strict';
  var ID = '1449562126688655';
  var optedOut = false;
  try { optedOut = localStorage.getItem('aira.noads') === '1'; } catch (e) {}
  var on = !optedOut && navigator.globalPrivacyControl !== true;

  function newId(prefix) {
    var r = '';
    try { r = crypto.randomUUID(); } catch (e) { r = Date.now().toString(36) + Math.random().toString(36).slice(2); }
    return prefix + '_' + r;
  }

  window.airaMeta = {
    on: on,
    newId: newId,
    // name: Meta standard event; eventId lets Meta match it with the copy our server sends.
    ev: function (name, data, eventId) {
      if (!on || !window.fbq) return;
      try { window.fbq('track', name, data || {}, eventId ? { eventID: eventId } : undefined); } catch (e) {}
    },
    optOut: function () {
      try { localStorage.setItem('aira.noads', '1'); } catch (e) {}
      on = false; window.airaMeta.on = false;
    },
  };
  if (!on) return;

  /* Private links (the plan link from our e-mails, the checkout id) must not reach Meta inside the page address.
     Keep them for the page in window.airaPrivate and take them out of the address bar before the pixel starts. */
  try {
    var u = new URL(location.href), keep = {}, hit = false;
    ['l', 'session_id'].forEach(function (k) { if (u.searchParams.has(k)) { keep[k] = u.searchParams.get(k); u.searchParams.delete(k); hit = true; } });
    if (hit) { window.airaPrivate = keep; history.replaceState(history.state, '', u.pathname + u.search + u.hash); }
  } catch (e) {}

  /* Meta's standard loader. */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('set', 'autoConfig', false, ID);
  window.fbq('init', ID);
  window.fbq('track', 'PageView');
})();
