'use client'

import TitleSection from '@/components/common/TitleSection'
import { Card } from '@/components/common/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { useGetEmotionPerformance } from '@/features/report'
import { EMOTION_DATA } from '@/constants'
import { formatNumber } from '@/lib/utils'

export default function ReportPage() {
  const { data: reportData, isLoading } = useGetEmotionPerformance()

  if (isLoading) {
    return (
      <div className="space-y-3 px-5 pt-6">
        <div className="state-loading-skeleton h-24 rounded-3xl" />
        <div className="state-loading-skeleton h-24 rounded-3xl" />
        <div className="state-loading-skeleton h-24 rounded-3xl" />
      </div>
    )
  }

  const bestEmotion = reportData?.data?.bestEmotion ?? null
  const worstEmotion = reportData?.data?.worstEmotion ?? null
  const details = reportData?.data?.details ?? []

  // 데이터가 아예 없는 경우
  if (!bestEmotion && details.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F5F7]">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]">
          <TitleSection title="AI 리포트" />
        </div>
        <div className="px-5 pt-20">
          <EmptyState
            icon="📉"
            title="아직 데이터가 부족해요"
            description={'매매 일지를 기록하고\n나만의 감정 패턴을 찾아보세요!'}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]">
        <TitleSection title="AI 리포트" />
      </div>

      <div className="space-y-6 px-5 pt-4">
        {/* 요약 카드 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#191F28]">감정별 투자 성과</h2>

          {bestEmotion && (
            <Card className="border-none bg-[#E8F3FF]">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl">
                  {EMOTION_DATA[bestEmotion.code as keyof typeof EMOTION_DATA]?.emoji || '👍'}
                </span>
                <p className="font-bold text-[#1B64DA]">
                  {bestEmotion.label}일 때 가장 잘 벌었어요!
                </p>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm text-[#5978A3]">평균 수익</span>
                <span className="text-xl font-bold text-[#1B64DA]">
                  +{formatNumber(bestEmotion.avgProfit)}원
                </span>
              </div>
            </Card>
          )}

          {worstEmotion && (
            <Card className="border-none bg-[#FFF0F0]">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl">
                  {EMOTION_DATA[worstEmotion.code as keyof typeof EMOTION_DATA]?.emoji || '👎'}
                </span>
                <p className="font-bold text-[#E92C2C]">{worstEmotion.label}일 때 조심하세요!</p>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm text-[#A35959]">평균 수익</span>
                <span className="text-xl font-bold text-[#E92C2C]">
                  {formatNumber(worstEmotion.avgProfit)}원
                </span>
              </div>
            </Card>
          )}
        </section>

        {/* 상세 리스트 */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#191F28]">전체 감정 분석</h2>
            <span className="text-xs text-[#8B95A1]">{details.length}개의 감정</span>
          </div>

          <div className="space-y-3">
            {details.map((item) => {
              const emotion = EMOTION_DATA[item.code as keyof typeof EMOTION_DATA]
              const isProfit = item.avgProfit >= 0
              return (
                <Card key={item.code} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F6] text-xl">
                      {emotion?.emoji || '😶'}
                    </div>
                    <div>
                      <p className="font-bold text-[#191F28]">{item.label}</p>
                      <p className="text-xs text-[#8B95A1]">{item.tradeCount}건의 매매</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isProfit ? 'text-[#FF6B6B]' : 'text-[#6C9EFF]'}`}>
                      {isProfit ? '+' : ''}
                      {formatNumber(item.avgProfit)}원
                    </p>
                    <p className="text-xs text-[#8B95A1]">승률 {item.winRate.toFixed(0)}%</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
