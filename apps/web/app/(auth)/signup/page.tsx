import { type Metadata } from 'next'
import { SignupForm } from '@/components/auth'

export const metadata: Metadata = {
  title: '회원가입 | EmotionTrade',
  description: 'EmotionTrade 회원가입',
}

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">회원가입</h2>
        <p className="mt-2 text-sm text-gray-600">EmotionTrade와 함께 투자 습관을 개선하세요</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <SignupForm />
      </div>
    </div>
  )
}
