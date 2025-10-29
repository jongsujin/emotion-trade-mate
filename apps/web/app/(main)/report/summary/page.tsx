'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ROUTES } from '@/constants'

// Mock 데이터
const MOCK_SUMMARY = {
  totalRecords: 48,
  totalSymbols: 12,
  avgReturnRate: 13.8,
  totalProfit: 12450,
  period: '최근 3개월',
  emotionStats: [
    { emoji: '😊', label: '자신감', count: 18, percentage: 38, avgReturn: 18.2 },
    { emoji: '🤔', label: '고민', count: 12, percentage: 25, avgReturn: 8.5 },
    { emoji: '😰', label: '불안', count: 10, percentage: 21, avgReturn: -2.3 },
    { emoji: '😎', label: '여유', count: 8, percentage: 16, avgReturn: 15.7 },
  ],
  bestSymbol: { symbol: 'NVDA', return: 28.5, emoji: '🤑' },
  worstSymbol: { symbol: 'TSLA', return: -2.35, emoji: '😰' },
  insights: [
    '😊 자신감 있을 때 평균 수익률이 가장 높아요',
    '😰 불안할 때는 손절 타이밍을 놓치는 경향이 있어요',
    '🤔 고민이 많을 때는 중립적인 결과가 나왔어요',
  ],
}

/**
 * 전체 감정 요약 리포트 페이지 - 토스 스타일
 */
export default function ReportSummaryPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900">전체 감정 리포트</h1>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        {/* 전체 요약 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">{MOCK_SUMMARY.period} 총 수익</p>
            <div className="mt-2 flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-red-500">
                +{MOCK_SUMMARY.totalProfit.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500">원</span>
            </div>
            <div className="mt-2 text-base font-medium text-red-500">
              +{MOCK_SUMMARY.avgReturnRate}%
            </div>
          </div>

          {/* 통계 그리드 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-600">기록 횟수</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{MOCK_SUMMARY.totalRecords}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-600">거래 종목</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{MOCK_SUMMARY.totalSymbols}</p>
            </div>
          </div>
        </div>

        {/* 최고/최악 종목 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 최고 */}
          <div className="rounded-2xl bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span>👑</span>
              <span>최고</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-3xl">{MOCK_SUMMARY.bestSymbol.emoji}</span>
              <p className="mt-1 text-base font-bold text-gray-900">
                {MOCK_SUMMARY.bestSymbol.symbol}
              </p>
              <p className="text-sm font-medium text-red-500">+{MOCK_SUMMARY.bestSymbol.return}%</p>
            </div>
          </div>

          {/* 최악 */}
          <div className="rounded-2xl bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span>💔</span>
              <span>최악</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-3xl">{MOCK_SUMMARY.worstSymbol.emoji}</span>
              <p className="mt-1 text-base font-bold text-gray-900">
                {MOCK_SUMMARY.worstSymbol.symbol}
              </p>
              <p className="text-sm font-medium text-blue-500">
                {MOCK_SUMMARY.worstSymbol.return}%
              </p>
            </div>
          </div>
        </div>

        {/* 감정별 통계 */}
        <div className="rounded-2xl bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">감정별 수익률</h3>

          <div className="mt-4 space-y-3">
            {MOCK_SUMMARY.emotionStats.map((stat, idx) => (
              <div key={idx} className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{stat.label}</p>
                      <p className="text-xs text-gray-600">
                        {stat.count}회 · {stat.percentage}%
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-base font-bold ${
                      stat.avgReturn >= 0 ? 'text-red-500' : 'text-blue-500'
                    }`}
                  >
                    {stat.avgReturn >= 0 ? '+' : ''}
                    {stat.avgReturn}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 인사이트 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h3 className="text-base font-semibold text-gray-900">핵심 인사이트</h3>
          </div>

          <div className="mt-3 space-y-2">
            {MOCK_SUMMARY.insights.map((insight, idx) => (
              <div key={idx} className="flex gap-2 rounded-xl bg-blue-50 p-3">
                <span className="text-lg">💡</span>
                <p className="flex-1 text-sm text-blue-900">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 종목별 리포트 바로가기 */}
        <div className="rounded-2xl bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">종목별 상세 리포트</h3>

          <div className="mt-3 space-y-2">
            {['AAPL', 'TSLA', 'NVDA'].map((symbol, idx) => (
              <Link key={idx} href={ROUTES.REPORT.DETAIL(String(idx + 1))}>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 active:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <p className="font-medium text-gray-900">{symbol}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PDF 다운로드 */}
        <button className="bg-primary-500 active:bg-primary-600 w-full rounded-2xl py-4 font-semibold text-white">
          전체 리포트 PDF 다운로드
        </button>
      </div>
    </div>
  )
}
