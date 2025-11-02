import { type Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { Button } from '@/components/common'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
  title: 'EmotionTrade | 감정 기반 투자 일지',
  description: '투자 감정을 기록하고 AI 분석으로 패턴을 파악하세요',
}

/**
 * 온보딩 페이지 - 심플하고 직관적인 디자인
 */
export default function Home() {
  return (
    <div className="bg-background-primary flex min-h-screen flex-col">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
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

          {/* 주요 기능 */}
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

          {/* CTA */}
          <div className="space-y-3">
            <Link href={ROUTES.JOURNAL.CREATE} className="block">
              <Button variant="primary" size="lg" fullWidth>
                시작하기
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-500">무료로 시작 • 언제든 취소 가능</p>
          </div>
        </div>
      </main>
    </div>
  )
}
