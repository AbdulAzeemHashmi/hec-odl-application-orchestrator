const CACHE_NAME = 'hec-odl-cache-v3'
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/login',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/icons/maskable.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Skip non-GET and API routes from offline cache
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return
  }

  // Navigation requests: Network first with /offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then((cached) => cached || caches.match('/offline'))
      )
    )
    return
  }

  // Same-origin static assets: Cache first, fallback to network
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((hit) => {
        return (
          hit ||
          fetch(request).then((response) => {
            if (response.status === 200) {
              const copy = response.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
            }
            return response
          })
        )
      })
    )
  }
})
