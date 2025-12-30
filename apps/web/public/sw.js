/* eslint-disable no-restricted-globals */

// EmotionTrade PWA Service Worker (minimal, dependency-free)
// - Navigations: network-first, offline fallback
// - Static assets: cache-first

const VERSION = 'v1'
const ASSET_CACHE_NAME = `emotiontrade-assets-${VERSION}`
const PAGE_CACHE_NAME = `emotiontrade-pages-${VERSION}`
const OFFLINE_URL = '/offline'

function isNavigationRequest(request) {
  return request.mode === 'navigate'
}

function isSameOrigin(url) {
  return url.origin === self.location.origin
}

function isStaticAssetRequest(url) {
  // Next static assets + public assets(확장자 기반)
  if (url.pathname.startsWith('/_next/static/')) return true

  const staticExtensions = [
    '.js',
    '.css',
    '.svg',
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.gif',
    '.ico',
    '.woff',
    '.woff2',
    '.ttf',
    '.otf',
    '.json',
    '.webmanifest',
  ]

  return staticExtensions.some((ext) => url.pathname.endsWith(ext))
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      self.skipWaiting()
      const cache = await caches.open(PAGE_CACHE_NAME)
      await cache.addAll([OFFLINE_URL])
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (key === ASSET_CACHE_NAME) return undefined
          if (key === PAGE_CACHE_NAME) return undefined
          if (key.startsWith('emotiontrade-')) return caches.delete(key)
          return undefined
        })
      )

      await self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (!isSameOrigin(url)) return

  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          // network-first (최신 화면 우선)
          const response = await fetch(request)
          const cache = await caches.open(PAGE_CACHE_NAME)
          cache.put(request, response.clone())
          return response
        } catch {
          const cached = await caches.match(request)
          if (cached) return cached
          const offline = await caches.match(OFFLINE_URL)
          return (
            offline ||
            new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
          )
        }
      })()
    )
    return
  }

  if (isStaticAssetRequest(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSET_CACHE_NAME)
        const cached = await cache.match(request)
        if (cached) return cached

        const response = await fetch(request)
        cache.put(request, response.clone())
        return response
      })()
    )
  }
})


