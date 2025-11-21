'use client'

import { use } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { MOCK_JOURNAL_DETAIL } from '@/constants/journals'
import {
  JournalDetailEmotionTimeLine,
  JournalDetailHeader,
  JournalDetailSummary,
} from '@/components/journal/detail'
import { Button } from '@/components/common/Button'

/**
 * 종목별 감정 타임라인 페이지
 */
export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-32">
      {/* 헤더 */}
      <JournalDetailHeader symbol={MOCK_JOURNAL_DETAIL.symbol} />

      <div className="space-y-4 px-5 pt-2">
        {/* 종목 요약 */}
        <JournalDetailSummary
          symbolName={MOCK_JOURNAL_DETAIL.symbolName}
          currentPrice={MOCK_JOURNAL_DETAIL.currentPrice}
          returnRate={MOCK_JOURNAL_DETAIL.returnRate}
          buyPrice={MOCK_JOURNAL_DETAIL.buyPrice}
          profit={MOCK_JOURNAL_DETAIL.profit}
          totalQuantity={MOCK_JOURNAL_DETAIL.totalQuantity}
          buyDate={MOCK_JOURNAL_DETAIL.buyDate}
        />

        {/* 감정 타임라인 */}
        <JournalDetailEmotionTimeLine
          totalRecords={MOCK_JOURNAL_DETAIL.totalRecords}
          emotionHistory={MOCK_JOURNAL_DETAIL.emotionHistory}
          buyPrice={MOCK_JOURNAL_DETAIL.buyPrice}
        />
      </div>

      {/* 하단 고정 액션 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F2F4F6] p-5 max-w-[480px] mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.JOURNAL.ADD_EMOTION(id)} className="w-full">
            <Button variant="secondary" fullWidth size="lg" className="font-bold bg-[#E8F3FF] text-[#1B64DA] hover:bg-[#D6E6FA]">
              감정 추가
            </Button>
          </Link>
          <Link href={ROUTES.REPORT.DETAIL(id)} className="w-full">
            <Button variant="primary" fullWidth size="lg" className="font-bold shadow-lg shadow-[#6C9EFF]/30 bg-[#6C9EFF] hover:bg-[#4B82F0]">
              AI 리포트
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
