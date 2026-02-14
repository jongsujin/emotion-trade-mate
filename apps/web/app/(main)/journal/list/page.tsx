'use client'

import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '@/features/report/api'
import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { useJournals } from '@/features/journal'

export default function JournalListPage() {
  const { data: response, isLoading: isJournalsLoading } = useJournals(1, 20)
  const { data: dashboardResponse, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })

  if (isJournalsLoading || isDashboardLoading) {
    return (
      <div className="space-y-4 px-5 pb-24 pt-8">
        <div className="state-loading-skeleton h-28 rounded-2xl" />
        <div className="state-loading-skeleton h-32 rounded-2xl" />
        <div className="state-loading-skeleton h-32 rounded-2xl" />
      </div>
    )
  }

  const journals = response?.data?.content ?? []
  const summary = dashboardResponse?.data?.summary
  const fx = dashboardResponse?.data?.fx

  const totalValuationProfit = summary?.unrealizedProfit ?? 0
  const totalActiveCost = summary?.totalCost ?? 0
  const avgReturn = totalActiveCost > 0 ? (totalValuationProfit / totalActiveCost) * 100 : 0

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <div className="mx-auto min-h-screen max-w-[480px] pb-12">
        <JournalHeader
          totalProfit={totalValuationProfit}
          avgReturn={avgReturn}
          holdingCount={journals.length}
          baseCurrency={fx?.baseCurrency}
          usdKrwRate={fx?.usdKrwRate}
        />

        {journals.length > 0 ? <JournalList journals={journals} /> : <JournalEmptyState />}
      </div>
    </div>
  )
}
