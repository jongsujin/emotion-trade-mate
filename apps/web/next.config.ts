import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Service Worker는 업데이트가 빠르게 반영되도록 캐시를 막아두는 게 안전합니다.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        // manifest도 업데이트 반영을 위해 짧게 캐시(혹은 no-store) 권장
        source: '/manifest.webmanifest',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
    ]
  },
}

export default nextConfig
