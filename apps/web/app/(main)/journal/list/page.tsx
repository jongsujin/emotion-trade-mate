'use client'

import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { useJournals } from '@/features/journal'
import type { JournalItemData } from '@/types/journals'
import type { Journal } from '@/types'

/**
 * Journal 타입을 JournalItemData 타입으로 변환
 */
function transformJournalData(journal: Journal): JournalItemData {
  // 수익률 계산 (임시로 0% 사용, 나중에 현재가 API 연동 후 계산)
  const returnRate = 0

  return {
    id: journal.id,
    symbol: journal.symbol,
    symbolName: journal.symbolName,
    emoji: '📊', // 임시 이모지 (감정 기록 연동 후 실제 감정 사용)
    emotionLabel: '중립', // 임시 라벨
    emotionCount: 1, // 임시 값 (감정 기록 수)
    returnRate,
    currentPrice: journal.buyPrice, // 임시로 매수가 사용 (현재가 API 필요)
    buyPrice: journal.buyPrice,
    buyDate: journal.buyDate,
    quantity: journal.totalQuantity,
  }
}

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
  const journals = rawJournals.map(transformJournalData)
  console.log('response', response)
  console.log('rawJournals', rawJournals)
  console.log('journals', journals)

  // 평균 수익률 계산
  const avgReturn =
    journals.length > 0
      ? journals.reduce((sum, journal) => sum + journal.returnRate, 0) / journals.length
      : 0

  const floatAverageReturn = parseFloat(avgReturn.toFixed(2))
  // 총 수익 계산 (임시로 totalCost 합계 사용)
  const totalProfit = rawJournals.reduce((sum, journal) => sum + journal.totalCost, 0)

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      <div className="mx-auto min-h-screen max-w-md pb-10">
        <JournalHeader
          totalProfit={totalProfit}
          avgReturn={floatAverageReturn}
          holdingCount={journals.length}
        />

        {journals.length > 0 ? <JournalList journals={journals} /> : <JournalEmptyState />}
      </div>
    </div>
  )
}
