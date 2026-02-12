'use client'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import TitleSection from '@/components/common/TitleSection'
import { EmptyState } from '@/components/common/EmptyState'
import {
  ProfitSummary,
  StockComparison,
  EmotionStats,
  AIInsights,
  StockReportList,
  PdfDownloadButton,
} from '@/components/report/summary'
import { EMOTION_DATA, type EmotionType } from '@/constants/emotions'
import { useJournals } from '@/features/journal'
import { getDashboardData } from '@/features/report'
import { useGetEmotionPerformance } from '@/features/report/hooks'

const PERIOD_DEFAULT_LABEL = '최근 30일'

function formatPeriodLabel(dates: string[]) {
  if (dates.length === 0) return PERIOD_DEFAULT_LABEL

  const sortedDates = [...dates].sort()
  const start = (sortedDates.at(0) || PERIOD_DEFAULT_LABEL).replaceAll('-', '.')
  const end = (sortedDates.at(-1) || PERIOD_DEFAULT_LABEL).replaceAll('-', '.')

  if (start === end) return start
  return `${start} - ${end}`
}

export default function ReportSummaryPage() {
  const router = useRouter()

  const {
    data: dashboardResponse,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    refetch: refetchDashboard,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
  const {
    data: performanceResponse,
    isLoading: isPerformanceLoading,
    isError: isPerformanceError,
    refetch: refetchPerformance,
  } = useGetEmotionPerformance()
  const {
    data: journalsResponse,
    isLoading: isJournalsLoading,
    isError: isJournalsError,
    refetch: refetchJournals,
  } = useJournals(1, 100)

  const isLoading = isDashboardLoading || isPerformanceLoading || isJournalsLoading
  const hasApiError =
    isDashboardError ||
    isPerformanceError ||
    isJournalsError ||
    !dashboardResponse?.success ||
    !performanceResponse?.success ||
    !journalsResponse?.success

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F4F5F7] px-5 pt-6 pb-24">
        <div className="space-y-4">
          <div className="state-loading-skeleton h-56 rounded-3xl" />
          <div className="state-loading-skeleton h-48 rounded-3xl" />
          <div className="state-loading-skeleton h-40 rounded-3xl" />
        </div>
      </section>
    )
  }

  if (hasApiError || !dashboardResponse?.data || !performanceResponse?.data) {
    return (
      <section className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
          <TitleSection title="감정 리포트" onClick={() => router.back()} />
        </div>
        <div className="px-5 pt-20">
          <EmptyState
            icon="⚠️"
            title="리포트를 불러오지 못했어요"
            description={'잠시 후 다시 시도해주세요.\n문제가 계속되면 API 상태를 확인해주세요.'}
          />
          <button
            onClick={() => {
              refetchDashboard()
              refetchPerformance()
              refetchJournals()
            }}
            className="mt-6 w-full rounded-2xl bg-[#67ccf4] py-3 text-sm font-semibold text-white"
          >
            다시 시도
          </button>
        </div>
      </section>
    )
  }

  const dashboard = dashboardResponse.data
  const performance = performanceResponse.data
  const journals = journalsResponse?.data?.content ?? []

  if (performance.details.length === 0 && journals.length === 0) {
    return (
      <section className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
          <TitleSection title="감정 리포트" onClick={() => router.back()} />
        </div>
        <div className="px-5 pt-20">
          <EmptyState
            icon="📭"
            title="분석할 데이터가 부족해요"
            description={'저널과 이벤트를 더 기록하면\n감정 성과 리포트를 확인할 수 있어요.'}
          />
        </div>
      </section>
    )
  }

  const summary = dashboard.summary
  const emotionTradeTotal = performance.details.reduce((total, item) => total + item.tradeCount, 0)
  const emotionStats = performance.details.map((item) => {
    const emotion = EMOTION_DATA[item.code as EmotionType]
    return {
      emoji: emotion?.emoji || '😶',
      label: item.label,
      count: item.tradeCount,
      percentage: emotionTradeTotal > 0 ? Math.round((item.tradeCount / emotionTradeTotal) * 100) : 0,
      avgProfit: Math.round(item.avgProfit),
    }
  })

  const sortedByProfit = [...journals].sort((a, b) => b.realizedProfit - a.realizedProfit)
  const bestJournal = sortedByProfit[0] ?? null
  const worstJournal = sortedByProfit[sortedByProfit.length - 1] ?? null
  const uniqueSymbolCount = new Set(journals.map((journal) => journal.symbol)).size
  const avgReturnRate = summary.totalCost > 0 ? (summary.totalProfit / summary.totalCost) * 100 : 0
  const period = formatPeriodLabel(dashboard.recentTrend.map((trend) => trend.date))

  const bestSymbol = bestJournal
    ? {
        symbol: bestJournal.symbol,
        return:
          bestJournal.totalCost > 0 ? (bestJournal.realizedProfit / bestJournal.totalCost) * 100 : 0,
        emoji: EMOTION_DATA[bestJournal.primaryEmotion as EmotionType]?.emoji || '📈',
      }
    : null

  const worstSymbol = worstJournal
    ? {
        symbol: worstJournal.symbol,
        return:
          worstJournal.totalCost > 0
            ? (worstJournal.realizedProfit / worstJournal.totalCost) * 100
            : 0,
        emoji: EMOTION_DATA[worstJournal.primaryEmotion as EmotionType]?.emoji || '📉',
      }
    : null

  const insights: string[] = []
  if (performance.bestEmotion) {
    const best = performance.bestEmotion
    insights.push(
      `${best.label} 감정에서 평균 ${Math.round(best.avgProfit).toLocaleString('ko-KR')}원의 성과를 기록했어요.`
    )
  }
  if (performance.worstEmotion && performance.worstEmotion.avgProfit < 0) {
    const worst = performance.worstEmotion
    insights.push(
      `${worst.label} 감정에서는 평균 ${Math.round(Math.abs(worst.avgProfit)).toLocaleString('ko-KR')}원의 손실이 발생했어요.`
    )
  }
  if (summary.tradeCount > 0) {
    insights.push(`전체 승률은 ${summary.winRate.toFixed(1)}%이고, 누적 거래는 ${summary.tradeCount}건이에요.`)
  }
  if (insights.length === 0) {
    insights.push('데이터가 더 쌓이면 감정-성과 패턴 인사이트를 제공할 수 있어요.')
  }

  return (
    <section className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title="감정 리포트" onClick={() => router.back()} />
      </div>

      <div className="space-y-4 px-5 pt-2">
        <ProfitSummary
          emotionStats={emotionStats}
          bestSymbol={bestSymbol || { symbol: '-', return: 0, emoji: '📊' }}
          worstSymbol={worstSymbol || { symbol: '-', return: 0, emoji: '📊' }}
          insights={insights}
          period={period}
          totalProfit={summary.totalProfit}
          avgReturnRate={avgReturnRate}
          totalRecords={summary.tradeCount}
          totalSymbols={uniqueSymbolCount}
        />

        <StockComparison bestSymbol={bestSymbol} worstSymbol={worstSymbol} />

        <EmotionStats stats={emotionStats} />

        <AIInsights
          totalRecords={summary.tradeCount}
          totalSymbols={uniqueSymbolCount}
          avgReturnRate={avgReturnRate}
          totalProfit={summary.totalProfit}
          period={period}
          emotionStats={emotionStats}
          bestSymbol={bestSymbol || { symbol: '-', return: 0, emoji: '📊' }}
          worstSymbol={worstSymbol || { symbol: '-', return: 0, emoji: '📊' }}
          insights={insights}
        />

        <StockReportList items={journals.map((journal) => ({ id: journal.id, symbol: journal.symbol }))} />

        <PdfDownloadButton />
      </div>
    </section>
  )
}
