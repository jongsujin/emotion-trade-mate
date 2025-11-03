export default function OnBoardingHero() {
  return (
    <div className="w-full max-w-md space-y-12">
      {/* 히어로 섹션 */}
      <div className="text-center">
        <div className="from-primary-400 to-primary-600 mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg">
          <span className="text-4xl">💭</span>
        </div>
        <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
          감정으로 보는
          <br />
          나의 투자 습관
        </h1>
        <p className="text-lg text-gray-600">
          투자 결정 순간의 감정을 기록하고
          <br />
          패턴을 분석해보세요
        </p>
      </div>
    </div>
  )
}
