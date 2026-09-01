const CACHE = 'hec-odl-shell-v2'
const SHELL = ['/offline', '/login', '/manifest.webmanifest']
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())))
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())))
self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).pathname.startsWith('/api/')) return
  if (request.mode === 'navigate') { event.respondWith(fetch(request).catch(() => caches.match('/offline'))); return }
  if (new URL(request.url).origin === self.location.origin) event.respondWith(caches.match(request).then(hit => hit || fetch(request).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); return response })))
})
