import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '전체 리포트 | EmotionTrade',
  description: '전체 종목 감정 통계 및 패턴 분석',
}

/**
 * 전체 감정 요약 리포트 페이지 (향후 기능)
 * - 사용자 전체 종목 감정 통계
 * - 행동 패턴 분석
 */
export default function SummaryReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">전체 리포트</h1>
        <p className="mt-2 text-gray-600">나의 투자 감정 통계 및 패턴 분석</p>
      </div>

      {/* 전체 통계 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: '총 기록 수', value: '23개' },
          { label: '평균 수익률', value: '+12.5%' },
          { label: '가장 많은 감정', value: '😊 기쁨' },
          { label: '분석 기간', value: '30일' },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* TODO: 전체 감정 분포 차트 구현 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">감정 분포</h2>
        <p className="text-center text-gray-500">감정 분포 차트 (구현 예정)</p>
      </div>

      {/* TODO: 행동 패턴 분석 구현 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">행동 패턴 분석</h2>
        <p className="text-center text-gray-500">행동 패턴 분석 (구현 예정)</p>
      </div>
    </div>
  )
}
