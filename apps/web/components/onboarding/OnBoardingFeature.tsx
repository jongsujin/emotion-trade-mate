export default function OnBoardingFeature() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
          <span className="text-2xl">😊</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">감정 기록</h3>
          <p className="text-sm text-gray-600">매매 순간의 감정을 간단하게 기록</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50">
          <span className="text-2xl">📈</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">데이터 분석</h3>
          <p className="text-sm text-gray-600">감정과 수익률의 상관관계 시각화</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI 피드백</h3>
          <p className="text-sm text-gray-600">맞춤형 투자 습관 개선 제안</p>
        </div>
      </div>
    </div>
  )
}
