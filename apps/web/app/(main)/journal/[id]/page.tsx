'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants'

// Mock 데이터
const MOCK_JOURNAL = {
  id: '1',
  symbol: 'AAPL',
  symbolName: 'Apple Inc.',
  buyDate: '2024.01.15',
  buyPrice: 156.5,
  currentPrice: 180.75,
  quantity: 10,
  returnRate: 15.3,
  profit: 2430,
  totalRecords: 5,
  emotionHistory: [
    {
      date: '2024.03.15',
      emotion: '😊',
      emotionLabel: '자신감',
      price: 180.75,
      memo: '실적 발표 후 주가 급등. 역시 애플은 믿고 보는 종목이다.',
    },
    {
      date: '2024.03.10',
      emotion: '🤔',
      emotionLabel: '고민',
      price: 176.5,
      memo: '약간의 조정이 있었지만 장기적으로는 상승할 것 같다.',
    },
    {
      date: '2024.03.05',
      emotion: '😊',
      emotionLabel: '자신감',
      price: 178.8,
      memo: '뉴스에서 긍정적인 전망 보도. 홀딩 유지.',
    },
    {
      date: '2024.02.28',
      emotion: '😰',
      emotionLabel: '불안',
      price: 172.3,
      memo: '갑자기 하락해서 당황스럽다. 일단 지켜보자.',
    },
    {
      date: '2024.02.20',
      emotion: '😊',
      emotionLabel: '자신감',
      price: 179.6,
      memo: '드디어 수익 전환! 기분 좋다.',
    },
  ],
}

/**
 * 종목별 감정 타임라인 페이지 - 토스 스타일
 */
export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const isProfit = MOCK_JOURNAL.returnRate >= 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900">{MOCK_JOURNAL.symbol}</h1>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        {/* 종목 요약 */}
        <div className="rounded-2xl bg-white p-4">
          <p className="text-sm text-gray-600">{MOCK_JOURNAL.symbolName}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">${MOCK_JOURNAL.currentPrice}</span>
            <span
              className={`text-base font-medium ${isProfit ? 'text-red-500' : 'text-blue-500'}`}
            >
              {isProfit ? '+' : ''}
              {MOCK_JOURNAL.returnRate}%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
            <div>
              <p className="text-xs text-gray-600">매수가</p>
              <p className="mt-1 text-sm font-medium text-gray-900">${MOCK_JOURNAL.buyPrice}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">수익</p>
              <p
                className={`mt-1 text-sm font-bold ${isProfit ? 'text-red-500' : 'text-blue-500'}`}
              >
                {isProfit ? '+' : ''}
                {MOCK_JOURNAL.profit.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">보유 수량</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{MOCK_JOURNAL.quantity}주</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">매수일</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{MOCK_JOURNAL.buyDate}</p>
            </div>
          </div>
        </div>

        {/* 감정 타임라인 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h3 className="text-base font-semibold text-gray-900">감정 기록</h3>
            </div>
            <span className="text-sm text-gray-600">{MOCK_JOURNAL.totalRecords}회</span>
          </div>

          <div className="mt-4 space-y-3">
            {MOCK_JOURNAL.emotionHistory.map((record, idx) => {
              const priceDiff =
                idx < MOCK_JOURNAL.emotionHistory.length - 1
                  ? record.price - (MOCK_JOURNAL.emotionHistory[idx + 1]?.price ?? 0)
                  : record.price - MOCK_JOURNAL.buyPrice

              return (
                <div key={idx} className="rounded-xl bg-gray-50 p-3">
                  {/* 헤더 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{record.emotion}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{record.date}</p>
                        <p className="text-xs text-gray-600">{record.emotionLabel}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">${record.price}</p>
                      {idx < MOCK_JOURNAL.emotionHistory.length - 1 && (
                        <p
                          className={`text-xs font-medium ${
                            priceDiff >= 0 ? 'text-red-500' : 'text-blue-500'
                          }`}
                        >
                          {priceDiff >= 0 ? '+' : ''}${priceDiff.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 메모 */}
                  {record.memo && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{record.memo}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.JOURNAL.ADD_EMOTION(id)}>
            <button className="w-full rounded-2xl bg-white p-4 text-center font-medium text-gray-900 active:bg-gray-50">
              감정 추가
            </button>
          </Link>
          <Link href={ROUTES.REPORT.DETAIL(id)}>
            <button className="bg-primary-500 active:bg-primary-600 w-full rounded-2xl p-4 text-center font-medium text-white">
              AI 리포트
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
