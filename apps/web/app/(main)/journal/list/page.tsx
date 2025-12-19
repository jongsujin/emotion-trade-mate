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
  // 백엔드 List API에서 현재가/수익률/대표감정을 제공하지 않으므로 기본값 처리
  // 추후 백엔드에서 computed field로 제공해주면 연동 필요

  return {
    id: journal.id,
    symbol: journal.symbol,
    symbolName: journal.symbolName,
    emoji: '📝', // 기본 아이콘 (백엔드 연동 전까지)
    emotionLabel: '기록',
    emotionCount: 0, // 백엔드 eventCount가 있다면 그것을 사용, 없으면 0
    returnRate: 0, // 현재가가 없으므로 0% 처리
    currentPrice: journal.buyPrice, // 현재가 정보 부재로 매수가 표시
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
  const avgReturn = 0

  const floatAverageReturn = 0
  // 총 수익 계산 (현재가 부재로 인해 0 처리)
  const totalProfit = 0

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
