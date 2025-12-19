'use client'

import { EMOTION_DATA } from '@/constants'

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
  // 대표 감정 이모지 찾기
  const emotionData = journal.primaryEmotion
    ? EMOTION_DATA[journal.primaryEmotion as keyof typeof EMOTION_DATA]
    : null

  const emoji = emotionData ? emotionData.emoji : '📝'
  const emotionLabel = journal.primaryEmotionLabel || '기록'

  // 수익률 계산 (현재가 부재로 0 처리, 추후 외부 시세 연동 시 구현)
  const returnRate = 0

  return {
    id: journal.id,
    symbol: journal.symbol,
    symbolName: journal.symbolName,
    emoji,
    emotionLabel,
    emotionCount: 0, // 백엔드 eventCount가 DTO에는 있는데 Journal 타입에는 아직 없음? (확인 필요)
    // types/journals.ts JournalListResponse에는 eventCount가 없음 -> 추가 필요할듯?
    // 일단 0으로 둠
    returnRate,
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
