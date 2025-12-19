'use client'

import { use } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import {
  JournalDetailEmotionTimeLine,
  JournalDetailHeader,
  JournalDetailSummary,
} from '@/components/journal/detail'
import { Button } from '@/components/common/Button'
import { useGetJournalDetail } from '@/features/journal'

/**
 * 종목별 감정 타임라인 페이지
 */
export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const { data: journalDetail } = useGetJournalDetail(Number(id))
  console.log('journalDetail:', journalDetail)
  return journalDetail?.data ? (
    <div className="min-h-screen bg-[#F4F5F7] pb-32">
      {/* 헤더 */}
      <JournalDetailHeader symbol={journalDetail.data.journal.symbol} />

      <div className="space-y-4 px-5 pt-2">
        {/* 종목 요약 */}
        <JournalDetailSummary
          symbolName={journalDetail.data.journal.symbolName}
          currentPrice={journalDetail.data.metrics.currentPrice}
          returnRate={journalDetail.data.metrics.profitPercentage}
          buyPrice={journalDetail.data.journal.buyPrice}
          profit={journalDetail.data.metrics.profit}
          realizedProfit={journalDetail.data.metrics.realizedProfit}
          totalQuantity={journalDetail.data.journal.totalQuantity}
          buyDate={journalDetail.data.journal.buyDate}
        />

        {/* 감정 타임라인 */}
        <JournalDetailEmotionTimeLine
          totalRecords={journalDetail.data.events.length}
          emotionHistory={journalDetail.data.events.map((event) => ({
            id: event.id,
            type: event.type,
            price: event.price,
            emotions: event.emotions,
            quantity: event.quantity,
            memo: event.memo,
            createdAt: event.createdAt,
          }))}
          buyPrice={journalDetail.data.journal.buyPrice}
        />
      </div>

      {/* 하단 고정 액션 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 mx-auto max-w-[480px] border-t border-[#F2F4F6] bg-white p-5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.JOURNAL.ADD_EMOTION(id)} className="w-full">
            <Button
              variant="secondary"
              fullWidth
              size="lg"
              className="bg-[#E8F3FF] font-bold text-[#1B64DA] hover:bg-[#D6E6FA]"
            >
              감정 추가
            </Button>
          </Link>
          <Link href={ROUTES.REPORT.DETAIL(id)} className="w-full">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="bg-[#6C9EFF] font-bold shadow-lg shadow-[#6C9EFF]/30 hover:bg-[#4B82F0]"
            >
              AI 리포트
            </Button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>일지를 찾을 수 없습니다.</h1>
    </div>
  )
}
