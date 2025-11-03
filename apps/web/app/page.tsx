import { type Metadata } from 'next'
import Header from '@/components/common/Header'
import OnBoardingCta from '@/components/onboarding/OnBoardingCta'
import OnBoardingFeature from '@/components/onboarding/OnBoardingFeature'
import OnBoardingHero from '@/components/onboarding/OnBoardingHero'

export const metadata: Metadata = {
  title: 'EmotionTrade | 감정 기반 투자 일지',
  description: '투자 감정을 기록하고 AI 분석으로 패턴을 파악하세요',
}

/**
 * 온보딩 페이지
 */
export default function Home() {
  return (
    <div className="bg-background-primary flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md space-y-12">
          <OnBoardingHero />
          <OnBoardingFeature />
          <OnBoardingCta />
        </div>
      </main>
    </div>
  )
}
