import { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * 인증 페이지 레이아웃
 * 로그인/회원가입 페이지에 적용
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* 로고 */}
        <div className="text-center">
          <h1 className="text-primary text-3xl font-bold">EmotionTrade</h1>
          <p className="mt-2 text-sm text-gray-600">감정 기반 투자 일지</p>
        </div>

        {children}
      </div>
    </div>
  )
}
