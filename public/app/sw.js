/* Aira service worker: lets the installed app open fast and keep working with a weak connection.
   Pages: network first, saved copy if offline. Fonts, icons and libraries: saved copy first. */
const VERSION = 'aira-v1';
const SHELL = ['/app/', '/assets/aira.js', '/assets/icon-192.png', '/app/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  // Never cache login, payments or data calls.
  if (url.pathname.startsWith('/api/') || /supabase\.co$/.test(url.hostname) || /stripe\.com$/.test(url.hostname)) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('/app/', copy)); return res; })
      .catch(() => caches.match('/app/')));
    return;
  }
  const isStatic = url.origin === location.origin ? url.pathname.startsWith('/assets/') : /fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$/.test(url.hostname);
  if (!isStatic) return;
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return res;
  })));
});
