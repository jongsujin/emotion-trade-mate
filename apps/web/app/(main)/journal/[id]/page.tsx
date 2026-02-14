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
import { EmptyState } from '@/components/common/EmptyState'
import { useGetJournalDetail } from '@/features/journal'

export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const journalId = Number(id)

  const { data: journalDetail, isLoading } = useGetJournalDetail(journalId)

  if (isLoading) {
    return (
      <div className="space-y-4 px-5 pt-6">
        <div className="state-loading-skeleton h-36 rounded-3xl" />
        <div className="state-loading-skeleton h-56 rounded-3xl" />
      </div>
    )
  }

  if (!journalDetail?.data) {
    return (
      <div className="px-5 pt-20">
        <EmptyState
          icon="📭"
          title="일지를 찾을 수 없어요"
          description="삭제되었거나 접근 권한이 없는 일지입니다."
          ctaLabel="목록으로 이동"
          onCtaClick={() => {
            window.location.href = ROUTES.JOURNAL.LIST
          }}
        />
      </div>
    )
  }

  const { journal, metrics, events } = journalDetail.data

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-32">
      <JournalDetailHeader symbol={journal.symbol} />

      <div className="space-y-4 px-5 pt-3">
        <JournalDetailSummary
          symbol={journal.symbol}
          symbolName={journal.symbolName}
          currentPrice={metrics.currentPrice}
          returnRate={metrics.profitPercentage}
          buyPrice={journal.buyPrice}
          profit={metrics.profit}
          realizedProfit={metrics.realizedProfit}
          totalQuantity={journal.totalQuantity}
          buyDate={journal.buyDate}
        />

        <JournalDetailEmotionTimeLine
          totalRecords={events.length}
          emotionHistory={events.map((event) => ({
            id: event.id,
            type: event.type,
            price: event.price,
            emotions: event.emotions,
            quantity: event.quantity,
            memo: event.memo,
            createdAt: event.createdAt,
          }))}
          buyPrice={journal.buyPrice}
          symbol={journal.symbol}
        />
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-30 mx-auto max-w-[480px] border-t border-[#e2e8f0] bg-white/95 p-4 pb-8 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.JOURNAL.ADD_EMOTION(id)} className="w-full">
            <Button variant="secondary" fullWidth size="lg" className="h-12 font-semibold">
              이벤트 추가
            </Button>
          </Link>
          <Link href={ROUTES.REPORT.INDEX} className="w-full">
            <Button variant="primary" fullWidth size="lg" className="h-12 font-semibold">
              감정 분석 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
