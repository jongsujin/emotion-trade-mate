'use client'

import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { useJournals } from '@/features/journal'

/**
 * 감정 일지 리스트 페이지
 */
export default function JournalListPage() {
  const { data: response, isLoading } = useJournals(1, 10)

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[#8B95A1]">로딩 중...</div>
      </div>
    )
  }

  // 데이터 추출 및 변환
  const rawJournals = response?.data?.content || []

  console.log('response', response)
  console.log('rawJournals', rawJournals)

  // 평균 수익률 계산

  const floatAverageReturn = 0
  // 총 수익 계산 (현재가 부재로 인해 0 처리)
  const totalProfit = 0

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      <div className="mx-auto min-h-screen max-w-md pb-10">
        <JournalHeader
          totalProfit={totalProfit}
          avgReturn={floatAverageReturn}
          holdingCount={rawJournals.length}
        />

        {rawJournals.length > 0 ? <JournalList journals={rawJournals} /> : <JournalEmptyState />}
      </div>
    </div>
  )
}
