'use client'

import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '@/features/report/api'
import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { useJournals } from '@/features/journal'

/**
 * 감정 일지 리스트 페이지
 */
export default function JournalListPage() {
  const { data: response, isLoading: isJournalsLoading } = useJournals(1, 10)
  const { data: dashboardResponse, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })

  // 로딩 중
  if (isJournalsLoading || isDashboardLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[#8B95A1]">로딩 중...</div>
      </div>
    )
  }

  // 데이터 추출 및 변환
  const rawJournals = response?.data?.content || []
  const dashboardData = dashboardResponse?.data
  const summary = dashboardData?.summary

  // 수익률 계산 (Unrealized Profit / Total Active Basis)
  const totalValuationProfit = summary?.unrealizedProfit || 0
  const totalActiveCost = summary?.totalCost || 0
  const floatAverageReturn =
    totalActiveCost > 0 ? (totalValuationProfit / totalActiveCost) * 100 : 0
  // 헤더에는 평가 손익을 보여주는 것이 일반적이므로 unrealizedProfit 사용 (혹은 totalProfit을 원하면 변경 가능)
  // PRD V2.0 "총 평가 손익" -> Unrealized Profit seems correct.
  // But wait, "Total Profit" usually includes Realized for "Portfolio Performance".
  // Let's use totalProfit (Realized + Unrealized) as the big number, and calculate ROI based on that?
  // No, standard is: Big Number = Total Valuation ($), Small Number = Daily Change or ROI (%).
  // Let's stick to: Big Number = Total Profit (Realized + Unrealized), % = ROI (Total Profit / Total Invested... but we don't have Total Invested).
  // Let's go with: Big Number = Unrealized Profit (Current Valuation PnL), % = Unrealized ROI. This is what usually changes real-time.
  // Realized profit is distinct.
  // Let's use unrealizedProfit for "총 평가 손익".
  const displayProfit = totalValuationProfit

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      <div className="mx-auto min-h-screen max-w-md pb-10">
        <JournalHeader
          totalProfit={displayProfit}
          avgReturn={floatAverageReturn}
          holdingCount={rawJournals.length}
        />

        {rawJournals.length > 0 ? <JournalList journals={rawJournals} /> : <JournalEmptyState />}
      </div>
    </div>
  )
}
