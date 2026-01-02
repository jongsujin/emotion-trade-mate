/**
 * @description PWA Service Worker 등록 컴포넌트
 */

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
        console.error('Service Worker 등록 실패')
      }
    }

    register()
  }, [])

  return null
}
