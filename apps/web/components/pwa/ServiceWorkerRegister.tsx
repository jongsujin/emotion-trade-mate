'use client'

import { useEffect } from 'react'

const SERVICE_WORKER_URL = '/sw.js'

export function ServiceWorkerRegister() {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === 'production'
    if (!isProd) return
    if (!('serviceWorker' in navigator)) return

    const register = async () => {
      try {
        await navigator.serviceWorker.register(SERVICE_WORKER_URL, { scope: '/' })
      } catch {
        // 등록 실패는 앱 기능에 치명적이지 않으므로 조용히 무시합니다.
      }
    }

    register()
  }, [])

  return null
}


