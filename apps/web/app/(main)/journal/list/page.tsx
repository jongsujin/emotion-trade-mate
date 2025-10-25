import { type Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { Card, Badge } from '@/components/common'

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
    emotionCount: 5,
    returnRate: 15.3,
    currentPrice: 180.75,
    buyPrice: 156.5,
  },
  {
    id: '2',
    symbol: 'TSLA',
    symbolName: 'Tesla',
    emoji: '😰',
    emotionCount: 3,
    returnRate: -2.35,
    currentPrice: 720.5,
    buyPrice: 737.82,
  },
  {
    id: '3',
    symbol: 'NVDA',
    symbolName: 'NVIDIA',
    emoji: '🤑',
    emotionCount: 7,
    returnRate: 28.5,
    currentPrice: 465.32,
    buyPrice: 362.15,
  },
]

/**
 * 감정 일지 리스트 페이지 (레퍼런스 디자인 적용)
 * - 카드 기반 레이아웃
 * - 차트 미니 프리뷰
 * - 수익률 표시
 */
export default function JournalListPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">감정 일지</h1>
        <p className="mt-1 text-sm text-text-secondary">나의 투자 감정 기록</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm text-text-tertiary">전체 종목</p>
            <p className="mt-1 text-3xl font-bold text-text-primary">{MOCK_JOURNALS.length}</p>
          </div>
        </Card>
        <Card variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm text-text-tertiary">평균 수익률</p>
            <p className="mt-1 text-3xl font-bold text-accent-green">
              +
              {(
                MOCK_JOURNALS.reduce((acc, j) => acc + j.returnRate, 0) / MOCK_JOURNALS.length
              ).toFixed(1)}
              %
            </p>
          </div>
        </Card>
      </div>

      {/* 필터 버튼 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="flex-shrink-0 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-soft">
          전체
        </button>
        <button className="flex-shrink-0 rounded-full bg-surface-elevated px-4 py-2 text-sm font-medium text-text-secondary">
          수익률순
        </button>
        <button className="flex-shrink-0 rounded-full bg-surface-elevated px-4 py-2 text-sm font-medium text-text-secondary">
          감정별
        </button>
      </div>

      {/* 일지 카드 리스트 */}
      <div className="space-y-4">
        {MOCK_JOURNALS.map((journal) => (
          <Link key={journal.id} href={ROUTES.JOURNAL.DETAIL(journal.id)}>
            <Card variant="elevated" padding="md" hoverable>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {/* 아이콘 */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200">
                    <span className="text-2xl">{journal.emoji}</span>
                  </div>

                  {/* 정보 */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-text-primary">{journal.symbol}</h3>
                      <Badge variant="default" size="sm">
                        {journal.emotionCount}개 기록
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-text-tertiary">{journal.symbolName}</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      ${journal.currentPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* 수익률 */}
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${
                      journal.returnRate >= 0 ? 'text-accent-green' : 'text-red-500'
                    }`}
                  >
                    {journal.returnRate >= 0 ? '+' : ''}
                    {journal.returnRate.toFixed(2)}%
                  </div>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    {journal.returnRate >= 0 ? '↗' : '↘'} $
                    {Math.abs(journal.currentPrice - journal.buyPrice).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* 미니 차트 (플레이스홀더) */}
              <div className="mt-4 h-16 rounded-lg bg-gradient-to-r from-primary-50 to-transparent">
                <svg className="h-full w-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path
                    d={
                      journal.returnRate >= 0
                        ? 'M 0 40 Q 50 30, 100 20 T 200 10'
                        : 'M 0 10 Q 50 20, 100 30 T 200 40'
                    }
                    fill="none"
                    stroke={journal.returnRate >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
