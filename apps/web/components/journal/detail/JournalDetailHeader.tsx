'use client'

import { useRouter } from 'next/navigation'

/**
 * @description 일지 상세 페이지 헤더 컴포넌트
 * @param symbol 종목 심볼
 */
export default function JournalDetailHeader({ symbol }: { symbol: string }) {
  const router = useRouter()
  return (
    <div className="bg-white px-4 py-3.5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">{symbol}</h1>
      </div>
    </div>
  )
}
