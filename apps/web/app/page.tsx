import { type Metadata } from 'next'
import Header from '@/components/common/Header'
import OnBoardingCta from '@/components/onboarding/OnBoardingCta'
import OnBoardingFeature from '@/components/onboarding/OnBoardingFeature'
import OnBoardingHero from '@/components/onboarding/OnBoardingHero'

export const metadata: Metadata = {
  title: 'EmotionTrade | 감정 기반 투자 일지',
  description: '투자 감정을 기록하고 AI 분석으로 패턴을 파악하세요',
}

export default function Home() {
  return (
    <div className="bg-[#F2F4F6] min-h-screen flex flex-col pb-32">
      <Header />
      <main className="flex-1 px-5 flex flex-col items-center">
        <div className="w-full max-w-md">
          <OnBoardingHero />
          <OnBoardingFeature />
        </div>
      </main>
      <OnBoardingCta />
    </div>
  )
}
