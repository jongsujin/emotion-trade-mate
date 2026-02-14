'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import {
  ReportEmotions,
  ReportStockInfo,
  ReportEmotionBreakdown,
  ReportKeywords,
  ReportMemoTimeline,
  ReportAIInsights,
  ReportPdfDownload,
} from '@/components/report/detail'
import TitleSection from '@/components/common/TitleSection'
import { EmptyState } from '@/components/common/EmptyState'
import { useGetJournalDetail } from '@/features/journal'
import { EMOTION_DATA, type EmotionType } from '@/constants/emotions'
import { formatProfitWithSymbol } from '@/lib/utils'
import type { InsightItem, KeywordItem, MemoTimelineEntry } from '@/types/reports'

const KEYWORD_STOPWORDS = new Set([
  '그리고',
  '하지만',
  '그래서',
  '진짜',
  '매수',
  '매도',
  '오늘',
  '이번',
  '기록',
  '현재',
  '가격',
  '수익',
  '손실',
  '생각',
])

function formatDateLabel(dateInput: string) {
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return dateInput
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

function formatPeriodLabel(startDate: string, endDate: string) {
  if (startDate === endDate) return startDate
  return `${startDate} - ${endDate}`
}

function buildKeywords(memos: string[]): KeywordItem[] {
  const counts = new Map<string, number>()
  const joined = memos.join(' ')
  const words = joined.match(/[가-힣A-Za-z]{2,}/g) || []

  words.forEach((rawWord) => {
    const word = rawWord.toLowerCase()
    if (KEYWORD_STOPWORDS.has(word)) return

    counts.set(word, (counts.get(word) || 0) + 1)
  })

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({ word, count }))
}

function buildInsights(args: {
  dominantEmotion: string
  dominantPercentage: number
  profitPercentage: number
  realizedProfit: number
  symbol: string
  buyCount: number
  sellCount: number
  memoCount: number
}): InsightItem[] {
  const {
    dominantEmotion,
    dominantPercentage,
    profitPercentage,
    realizedProfit,
    symbol,
    buyCount,
    sellCount,
    memoCount,
  } = args

  const insights: InsightItem[] = []

  if (dominantEmotion) {
    insights.push({
      title: `주요 감정은 ${dominantEmotion}`,
      description: `전체 이벤트의 ${dominantPercentage}%에서 해당 감정이 반복됐습니다.`,
      type: 'info',
    })
  }

  insights.push({
    title: profitPercentage >= 0 ? '평가손익이 플러스입니다' : '평가손익이 마이너스입니다',
    description: `현재 수익률은 ${profitPercentage.toFixed(1)}%이고, 확정손익은 ${formatProfitWithSymbol(realizedProfit, symbol, { withPlus: true })}입니다.`,
    type: profitPercentage >= 0 ? 'positive' : 'warning',
  })

  if (buyCount > sellCount) {
    insights.push({
      title: '매수 이벤트 비중이 높습니다',
      description: `매수 ${buyCount}회 / 매도 ${sellCount}회입니다. 청산 규칙을 함께 점검해보세요.`,
      type: 'warning',
    })
  } else {
    insights.push({
      title: '매수/매도 균형이 유지되고 있습니다',
      description: `매수 ${buyCount}회 / 매도 ${sellCount}회로 비교적 균형 잡힌 기록입니다.`,
      type: 'positive',
    })
  }

  if (memoCount === 0) {
    insights.push({
      title: '메모가 부족합니다',
      description: '결정 이유를 1~2줄이라도 남기면 감정-성과 패턴 분석 정확도가 올라갑니다.',
      type: 'warning',
    })
  }

  return insights.slice(0, 4)
}

/**
 * 종목별 리포트 상세 페이지 (journalId 기반)
 */
export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const journalId = Number(id)
  const isValidJournalId = Number.isFinite(journalId) && journalId > 0

  const {
    data: journalDetailResponse,
    isLoading,
    isError,
    refetch,
  } = useGetJournalDetail(journalId, { enabled: isValidJournalId })

  if (!isValidJournalId) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
          <TitleSection title="리포트 상세" onClick={() => router.back()} />
        </div>
        <div className="px-5 pt-20">
          <EmptyState icon="🚫" title="유효하지 않은 리포트 ID입니다" description="다시 선택해주세요." />
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] px-5 pt-6 pb-24">
        <div className="space-y-4">
          <div className="state-loading-skeleton h-40 rounded-2xl" />
          <div className="state-loading-skeleton h-40 rounded-2xl" />
          <div className="state-loading-skeleton h-40 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (isError || !journalDetailResponse?.success) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
          <TitleSection title="리포트 상세" onClick={() => router.back()} />
        </div>
        <div className="px-5 pt-20">
          <EmptyState
            icon="⚠️"
            title="리포트 데이터를 불러오지 못했어요"
            description="잠시 후 다시 시도해주세요."
          />
          <button
            onClick={() => refetch()}
            className="mt-6 w-full rounded-2xl bg-[#67ccf4] py-3 text-sm font-semibold text-white"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  const detail = journalDetailResponse.data
  if (!detail) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
          <TitleSection title="리포트 상세" onClick={() => router.back()} />
        </div>
        <div className="px-5 pt-20">
          <EmptyState
            icon="📭"
            title="리포트로 변환할 데이터가 없습니다"
            description="저널 이벤트를 더 기록한 뒤 다시 확인해주세요."
          />
        </div>
      </div>
    )
  }

  const events = detail.events
  const memos = events
    .map((event) => event.memo?.trim())
    .filter((memo): memo is string => Boolean(memo))

  const emotionCounter = new Map<string, { label: string; count: number }>()
  events.forEach((event) => {
    event.emotions.forEach((emotion) => {
      const key = emotion.code
      const prev = emotionCounter.get(key)
      emotionCounter.set(key, {
        label: emotion.label,
        count: (prev?.count || 0) + 1,
      })
    })
  })

  const emotionTotalCount = [...emotionCounter.values()].reduce((sum, entry) => sum + entry.count, 0)
  const emotionBreakdown = [...emotionCounter.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([code, value]) => {
      const emotionData = EMOTION_DATA[code as EmotionType]
      return {
        emotion: `${emotionData?.emoji || '😶'} ${value.label}`,
        count: value.count,
        percentage: emotionTotalCount > 0 ? Math.round((value.count / emotionTotalCount) * 100) : 0,
      }
    })

  const dominant = emotionBreakdown[0]
  const dominantEmoji = dominant?.emotion.split(' ')[0] || '😶'
  const dominantEmotion = dominant ? dominant.emotion.replace(`${dominantEmoji} `, '') : '데이터 없음'

  const memoTimeline: MemoTimelineEntry[] = events
    .filter((event) => event.memo?.trim())
    .map((event, index, filteredEvents) => {
      const previousEvent = filteredEvents[index + 1]
      const previousPrice = previousEvent?.price ?? event.price
      const priceChange =
        previousPrice > 0 ? ((event.price - previousPrice) / previousPrice) * 100 : 0
      const emotionCode = event.emotions[0]?.code
      const emotionInfo = EMOTION_DATA[emotionCode as EmotionType]

      return {
        date: formatDateLabel(event.createdAt),
        price: event.price,
        priceChange: Number(priceChange.toFixed(2)),
        emotion: emotionInfo?.emoji || '📝',
        emotionLabel: event.emotions[0]?.label || '기록',
        memo: event.memo?.trim() || '',
      }
    })

  const oldestEvent = events.at(-1)
  const latestEvent = events.at(0)
  const firstDate = formatDateLabel(oldestEvent?.createdAt || detail.journal.buyDate)
  const lastDate = formatDateLabel(latestEvent?.createdAt || detail.journal.buyDate)
  const period = formatPeriodLabel(firstDate, lastDate)

  const keywords = buildKeywords(memos)
  const buyCount = events.filter((event) => event.type === 'BUY').length
  const sellCount = events.filter((event) => event.type === 'SELL').length

  const insights = buildInsights({
    dominantEmotion: dominantEmotion === '데이터 없음' ? '' : dominantEmotion,
    dominantPercentage: dominant?.percentage || 0,
    profitPercentage: detail.metrics.profitPercentage,
    realizedProfit: detail.metrics.realizedProfit,
    symbol: detail.journal.symbol,
    buyCount,
    sellCount,
    memoCount: memos.length,
  })

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title={`${detail.journal.symbol} 리포트`} onClick={() => router.back()} />
      </div>

      <div className="space-y-4 px-5 pt-2">
        <ReportStockInfo
          emoji={dominantEmoji}
          symbol={detail.journal.symbol}
          returnRate={detail.metrics.profitPercentage}
          profit={detail.metrics.profit}
          period={period}
          totalRecords={events.length}
          symbolName={detail.journal.symbolName}
        />

        <ReportEmotions
          dominantEmoji={dominantEmoji}
          dominantEmotion={dominantEmotion}
          percentage={dominant?.percentage || 0}
        />

        {emotionBreakdown.length > 0 ? (
          <ReportEmotionBreakdown emotionBreakdown={emotionBreakdown} />
        ) : (
          <div className="rounded-2xl bg-white p-4 text-sm text-gray-500">
            감정 분포 데이터를 아직 만들 수 없습니다.
          </div>
        )}

        {keywords.length > 0 ? (
          <ReportKeywords keywords={keywords} />
        ) : (
          <div className="rounded-2xl bg-white p-4 text-sm text-gray-500">
            메모 키워드가 아직 없습니다.
          </div>
        )}

        {memoTimeline.length > 0 ? (
          <ReportMemoTimeline memoTimeline={memoTimeline} symbol={detail.journal.symbol} />
        ) : (
          <div className="rounded-2xl bg-white p-4 text-sm text-gray-500">
            메모 타임라인을 생성할 데이터가 없습니다.
          </div>
        )}

        <ReportAIInsights insights={insights} />
        <ReportPdfDownload />
      </div>
    </div>
  )
}
