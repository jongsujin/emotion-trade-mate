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

/**
 * 종목별 감정 타임라인 페이지
 */
export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <JournalDetailHeader symbol={MOCK_JOURNAL_DETAIL.symbol} />

      <div className="space-y-3 px-4 py-5">
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

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.JOURNAL.ADD_EMOTION(id)}>
            <button className="w-full rounded-2xl bg-white p-4 text-center font-medium text-gray-900 active:bg-gray-50">
              감정 추가
            </button>
          </Link>
          <Link href={ROUTES.REPORT.DETAIL(id)}>
            <button className="bg-primary-500 active:bg-primary-600 w-full rounded-2xl p-4 text-center font-medium text-white">
              AI 리포트
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
