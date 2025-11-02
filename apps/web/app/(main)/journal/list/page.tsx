import { type Metadata } from 'next'
import { ROUTES } from '@/constants'
import JournalHeader from '@/components/journal/JournalHeader'
import JournalList from '@/components/journal/JournalList'
import JournalEmptyState from '@/components/journal/JournalEmptyState'
import { MOCK_JOURNALS } from '@/constants/journals'

export const metadata: Metadata = {
  title: '감정 일지 목록 | EmotionTrade',
  description: '나의 투자 감정 일지 목록',
}

/**
 * 감정 일지 리스트 페이지
 */
export default function JournalListPage() {
  // 통계 계산
  const totalReturn = MOCK_JOURNALS.reduce((acc, j) => acc + j.returnRate, 0)
  const avgReturn = totalReturn / MOCK_JOURNALS.length
  const totalProfit = MOCK_JOURNALS.reduce((acc, j) => {
    const profit = (j.currentPrice - j.buyPrice) * 10 // 가정: 10주씩
    return acc + profit
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <JournalHeader
        href={ROUTES.JOURNAL.CREATE}
        totalProfit={totalProfit}
        avgReturn={avgReturn}
        holdingCount={MOCK_JOURNALS.length}
      />
      <JournalList journals={MOCK_JOURNALS} href={(id) => ROUTES.JOURNAL.DETAIL(id)} />
      {MOCK_JOURNALS.length === 0 && <JournalEmptyState />}
    </div>
  )
}
