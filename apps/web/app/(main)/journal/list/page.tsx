import { type Metadata } from 'next'
import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { MOCK_JOURNALS } from '@/constants/journals'

export const metadata: Metadata = {
  title: '내 투자 일지 | EmotionTrade',
  description: '나의 투자 감정 일지 목록',
}

/**
 * 감정 일지 리스트 페이지
 */
export default function JournalListPage() {
  // 통계 계산
  const totalReturn = MOCK_JOURNALS.reduce((acc, j) => acc + j.returnRate, 0)
  const avgReturn = MOCK_JOURNALS.length > 0 ? totalReturn / MOCK_JOURNALS.length : 0
  const totalProfit = MOCK_JOURNALS.reduce((acc, j) => {
    const profit = (j.currentPrice - j.buyPrice) * 10 // 가정: 10주씩
    return acc + profit
  }, 0)

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      <div className="mx-auto max-w-md min-h-screen pb-10">
        <JournalHeader
          totalProfit={totalProfit}
          avgReturn={avgReturn}
          holdingCount={MOCK_JOURNALS.length}
        />
        
        {MOCK_JOURNALS.length > 0 ? (
          <JournalList journals={MOCK_JOURNALS} />
        ) : (
          <JournalEmptyState />
        )}
      </div>
    </div>
  )
}
