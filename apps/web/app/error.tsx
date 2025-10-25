'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 전역 에러 페이지
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (Sentry 등)
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900">문제가 발생했습니다</h1>
        <p className="mt-4 text-gray-600">
          일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-left">
            <p className="text-sm font-mono text-red-600">{error.message}</p>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
          >
            다시 시도
          </button>
          <Link
            href={ROUTES.HOME}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 hover:bg-gray-50"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
