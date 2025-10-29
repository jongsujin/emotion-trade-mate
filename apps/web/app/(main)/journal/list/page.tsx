import { type Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants'

export const metadata: Metadata = {
  title: '감정 일지 목록 | EmotionTrade',
  description: '나의 투자 감정 일지 목록',
}

// Mock 데이터 (추후 API로 대체)
const MOCK_JOURNALS = [
  {
    id: '1',
    symbol: 'AAPL',
    symbolName: 'Apple Inc.',
    emoji: '😊',
    emotionLabel: '자신감',
    emotionCount: 5,
    returnRate: 15.3,
    currentPrice: 180.75,
    buyPrice: 156.5,
    buyDate: '2024.01.15',
  },
  {
    id: '2',
    symbol: 'TSLA',
    symbolName: 'Tesla',
    emoji: '😰',
    emotionLabel: '불안',
    emotionCount: 5,
    returnRate: -2.35,
    currentPrice: 720.5,
    buyPrice: 737.82,
    buyDate: '2024.02.20',
  },
  {
    id: '3',
    symbol: 'NVDA',
    symbolName: 'NVIDIA',
    emoji: '🤑',
    emotionLabel: '욕심',
    emotionCount: 5,
    returnRate: 28.5,
    currentPrice: 465.32,
    buyPrice: 362.15,
    buyDate: '2023.12.01',
  },
]

/**
 * 감정 일지 리스트 페이지 - 토스 스타일 (390px 최적화)
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
      {/* 헤더 */}
      <div className="bg-white px-4 pt-3 pb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">투자</h1>
          <Link
            href={ROUTES.JOURNAL.CREATE}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <span className="text-lg">+</span>
          </Link>
        </div>

        {/* 총 수익 */}
        <div className="mt-6">
          <p className="text-xs text-gray-600">총 수익</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-gray-900' : 'text-red-500'}`}
            >
              {totalProfit >= 0 ? '+' : ''}
              {totalProfit.toFixed(0)}
            </span>
            <span className="text-base text-gray-500">원</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-sm">
            <span className={`font-medium ${avgReturn >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
              {avgReturn >= 0 ? '+' : ''}
              {avgReturn.toFixed(2)}%
            </span>
            <span className="text-gray-500">{MOCK_JOURNALS.length}개 보유</span>
          </div>
        </div>
      </div>

      {/* 종목 리스트 */}
      <div className="space-y-2 px-4 pt-3 pb-24">
        {MOCK_JOURNALS.map((journal) => {
          const isProfit = journal.returnRate >= 0
          const profit = (journal.currentPrice - journal.buyPrice) * 10 // 가정: 10주

          return (
            <Link key={journal.id} href={ROUTES.JOURNAL.DETAIL(journal.id)}>
              <div className="group rounded-2xl bg-white p-4 active:bg-gray-50">
                <div className="flex items-center justify-between">
                  {/* 왼쪽: 종목 정보 */}
                  <div className="flex items-center gap-3">
                    {/* 이모지 */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xl">{journal.emoji}</span>
                    </div>

                    {/* 종목명 */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900">
                          {journal.symbol}
                        </span>
                        <span className="text-xs text-gray-500">{journal.emotionCount}회</span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-600">{journal.symbolName}</p>
                    </div>
                  </div>

                  {/* 오른쪽: 수익률 */}
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${isProfit ? 'text-red-500' : 'text-blue-500'}`}
                    >
                      {isProfit ? '+' : ''}
                      {journal.returnRate.toFixed(2)}%
                    </div>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {profit >= 0 ? '+' : ''}
                      {profit.toFixed(0)}원
                    </p>
                  </div>
                </div>

                {/* 가격 정보 */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                  <span className="text-gray-500">현재가</span>
                  <span className="font-medium text-gray-900">
                    ${journal.currentPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}

        {/* 새 일지 추가 버튼 */}
        <Link href={ROUTES.JOURNAL.CREATE}>
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-4 text-gray-600 active:bg-gray-50">
            <span className="text-lg">+</span>
            <span className="text-sm font-medium">새 감정 일지 추가</span>
          </div>
        </Link>
      </div>

      {/* 빈 상태 */}
      {MOCK_JOURNALS.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <span className="text-5xl">📝</span>
            <p className="mt-4 text-base font-semibold text-gray-900">아직 기록이 없어요</p>
            <p className="mt-2 text-sm text-gray-600">첫 투자 감정을 기록해보세요</p>
            <Link href={ROUTES.JOURNAL.CREATE}>
              <button className="bg-primary-500 active:bg-primary-600 mt-6 rounded-xl px-8 py-3.5 text-base font-semibold text-white">
                감정 일지 작성하기
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
