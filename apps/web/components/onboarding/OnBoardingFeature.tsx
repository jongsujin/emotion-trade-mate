export default function OnBoardingFeature() {
  const features = [
    {
      icon: '😊',
      title: '초간단 감정 기록',
      desc: '매매 직후의 기분을 3초 만에 남겨요',
      bg: 'bg-[#FFF0F1]', // Red tint for contrast
    },
    {
      icon: '📈',
      title: '수익률과 감정 상관관계',
      desc: '어떤 기분일 때 돈을 버는지 알 수 있어요',
      bg: 'bg-[#E8F3FF]', // Blue tint
    },
    {
      icon: '🤖',
      title: 'AI 투자 코치',
      desc: '나의 투자 습관을 분석해 조언해줘요',
      bg: 'bg-[#F2F4F6]', // Gray tint
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="flex items-center gap-5 rounded-3xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.bg}`}>
            <span className="text-2xl">{feature.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[17px] font-bold text-[#191F28] mb-1">{feature.title}</h3>
            <p className="text-sm text-[#8B95A1]">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
