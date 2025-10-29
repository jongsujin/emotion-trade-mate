'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'

// Mock 데이터
const MOCK_REPORT = {
  symbol: 'AAPL',
  symbolName: 'Apple Inc.',
  emoji: '😊',
  period: '2024.01.15 - 2024.03.15',
  totalRecords: 12,
  dominantEmotion: '자신감',
  dominantEmoji: '😊',
  returnRate: 15.3,
  profit: 2430,
  emotionBreakdown: [
    { emotion: '😊 자신감', count: 5, percentage: 42 },
    { emotion: '🤔 고민', count: 4, percentage: 33 },
    { emotion: '😰 불안', count: 2, percentage: 17 },
    { emotion: '😎 여유', count: 1, percentage: 8 },
  ],
  insights: [
    {
      title: '자신감 있을 때 좋은 성과',
      description: '😊 자신감 있을 때 평균 수익률 +18.2%로 가장 높았어요',
      type: 'positive',
    },
    {
      title: '불안할 때 손절 타이밍 놓침',
      description: '😰 불안한 감정이 들 때 판단이 흐려져 손실이 커졌어요',
      type: 'warning',
    },
    {
      title: '충동적 거래 줄이기',
      description: '하루 3회 이상 기록할 때 수익률이 낮았어요. 여유를 가지세요',
      type: 'info',
    },
  ],
  // 메모 타임라인 추가
  memoTimeline: [
    {
      date: '2024.03.15',
      price: 180.75,
      priceChange: +2.5,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '실적 발표 후 주가 급등. 역시 애플은 믿고 보는 종목이다.',
    },
    {
      date: '2024.03.10',
      price: 176.5,
      priceChange: -1.2,
      emotion: '🤔',
      emotionLabel: '고민',
      memo: '약간의 조정이 있었지만 장기적으로는 상승할 것 같다. 추가 매수 고려 중.',
    },
    {
      date: '2024.03.05',
      price: 178.8,
      priceChange: +3.8,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '뉴스에서 긍정적인 전망 보도. 홀딩 유지.',
    },
    {
      date: '2024.02.28',
      price: 172.3,
      priceChange: -4.2,
      emotion: '😰',
      emotionLabel: '불안',
      memo: '갑자기 하락해서 당황스럽다. 손절할까 고민 중... 일단 지켜보자.',
    },
    {
      date: '2024.02.20',
      price: 179.6,
      priceChange: +5.1,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '드디어 수익 전환! 기분 좋다.',
    },
  ],
  // 키워드 분석
  keywords: [
    { word: '상승', count: 8 },
    { word: '실적', count: 5 },
    { word: '홀딩', count: 4 },
    { word: '고민', count: 4 },
    { word: '손절', count: 3 },
  ],
}

/**
 * AI 리포트 상세 페이지 - 메모 복기 기능 추가
 */
export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

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
          <h1 className="text-lg font-bold text-gray-900">AI 분석 리포트</h1>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        {/* 종목 정보 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl">{MOCK_REPORT.emoji}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-gray-900">{MOCK_REPORT.symbol}</h2>
              <p className="text-sm text-gray-600">{MOCK_REPORT.symbolName}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-red-500">+{MOCK_REPORT.returnRate}%</div>
              <div className="text-sm text-gray-600">+{MOCK_REPORT.profit.toLocaleString()}원</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
            <span className="text-gray-600">분석 기간</span>
            <span className="font-medium text-gray-900">{MOCK_REPORT.period}</span>
          </div>
          <div className="flex items-center justify-between pt-2 text-sm">
            <span className="text-gray-600">기록 횟수</span>
            <span className="font-medium text-gray-900">{MOCK_REPORT.totalRecords}회</span>
          </div>
        </div>

        {/* 주요 감정 */}
        <div className="rounded-2xl bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">가장 많이 느낀 감정</h3>
          <div className="mt-3 flex items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 py-6">
            <span className="text-5xl">{MOCK_REPORT.dominantEmoji}</span>
            <div>
              <p className="text-xl font-bold text-gray-900">{MOCK_REPORT.dominantEmotion}</p>
              <p className="mt-1 text-sm text-gray-600">전체의 42%</p>
            </div>
          </div>
        </div>

        {/* 감정 분포 */}
        <div className="rounded-2xl bg-white p-4">
          <h3 className="text-base font-semibold text-gray-900">감정 분포</h3>
          <div className="mt-3 space-y-3">
            {MOCK_REPORT.emotionBreakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.emotion}</span>
                  <span className="text-gray-600">
                    {item.count}회 ({item.percentage}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="bg-primary-500 h-full rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 자주 쓴 키워드 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <h3 className="text-base font-semibold text-gray-900">자주 쓴 단어</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {MOCK_REPORT.keywords.map((keyword, idx) => (
              <div
                key={idx}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
              >
                {keyword.word} <span className="text-xs text-gray-500">{keyword.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 메모 타임라인 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h3 className="text-base font-semibold text-gray-900">내가 쓴 메모</h3>
          </div>
          <p className="mt-1 text-xs text-gray-500">시간순으로 복기해보세요</p>

          <div className="mt-4 space-y-3">
            {MOCK_REPORT.memoTimeline.map((entry, idx) => (
              <div key={idx} className="rounded-xl bg-gray-50 p-3">
                {/* 헤더: 날짜 + 감정 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{entry.emotion}</span>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{entry.date}</p>
                      <p className="text-xs text-gray-600">{entry.emotionLabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${entry.price}</p>
                    <p
                      className={`text-xs font-medium ${
                        entry.priceChange >= 0 ? 'text-red-500' : 'text-blue-500'
                      }`}
                    >
                      {entry.priceChange >= 0 ? '+' : ''}
                      {entry.priceChange}%
                    </p>
                  </div>
                </div>

                {/* 메모 내용 */}
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{entry.memo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI 인사이트 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h3 className="text-base font-semibold text-gray-900">AI 분석</h3>
          </div>

          <div className="mt-3 space-y-2">
            {MOCK_REPORT.insights.map((insight, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-3 ${
                  insight.type === 'positive'
                    ? 'bg-green-50'
                    : insight.type === 'warning'
                      ? 'bg-orange-50'
                      : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base">
                    {insight.type === 'positive' ? '✅' : insight.type === 'warning' ? '⚠️' : '💡'}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        insight.type === 'positive'
                          ? 'text-green-900'
                          : insight.type === 'warning'
                            ? 'text-orange-900'
                            : 'text-blue-900'
                      }`}
                    >
                      {insight.title}
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        insight.type === 'positive'
                          ? 'text-green-700'
                          : insight.type === 'warning'
                            ? 'text-orange-700'
                            : 'text-blue-700'
                      }`}
                    >
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 리포트 다운로드 */}
        <button className="w-full rounded-2xl bg-white p-4 text-left active:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📄</span>
              <div>
                <p className="font-semibold text-gray-900">PDF로 저장</p>
                <p className="text-sm text-gray-600">리포트를 다운로드하세요</p>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </button>
      </div>
    </div>
  )
}
