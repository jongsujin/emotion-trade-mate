'use client'

import { useRouter } from 'next/navigation'

/**
 * @description 일지 상세 페이지 헤더
 */
export default function JournalDetailHeader({ symbol }: { symbol: string }) {
  const router = useRouter()
  return (
    <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md px-5 py-3 border-b border-[#E5E8EB]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 -ml-2 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <span className="text-2xl text-[#191F28] pb-1">←</span>
        </button>
        <h1 className="text-xl font-bold text-[#191F28]">{symbol}</h1>
      </div>
    </div>
  )
}
