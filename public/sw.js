const CACHE = 'hec-odl-v1'
const OFFLINE = ['/offline']
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(OFFLINE))))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(hit => hit || caches.match('/offline'))))
})
