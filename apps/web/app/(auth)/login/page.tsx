import { type Metadata } from 'next'
import { LoginForm } from '@/components/auth'

export const metadata: Metadata = {
  title: '로그인 | EmotionTrade',
  description: 'EmotionTrade 로그인',
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">로그인</h2>
        <p className="mt-2 text-sm text-gray-600">감정 일지를 기록하고 패턴을 분석해보세요</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  )
}
