import { type Metadata } from 'next'
import { Apple } from 'lucide-react'
import { LoginForm } from '@/components/auth'

const imgGoogle = 'https://www.figma.com/api/mcp/asset/f47afb95-3b23-4dc0-9cab-2650fd717293'

export const metadata: Metadata = {
  title: '로그인 | EmotionTrade',
  description: 'EmotionTrade 로그인',
}

export default function LoginPage() {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#111827]">
          다시 오신 걸 환영해요
        </h2>
        <p className="mt-2 text-[15px] text-[#6b7280]">
          감정 기반 투자 일지를 이어서 기록해보세요.
        </p>
      </div>

      <LoginForm />

      <div className="pt-2">
        <div className="relative text-center">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#e5e7eb]" />
          <span className="relative bg-white px-4 text-xs font-medium tracking-[0.12em] text-[#9ca3af] uppercase">
            소셜 계정으로 계속하기
          </span>
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f3f4f6] bg-[#f9fafb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgGoogle} alt="Google" className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f3f4f6] bg-[#f9fafb] text-[#111827]">
            <Apple className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="pt-2 text-center text-xs text-[#9ca3af]">
        계속하면 <span className="underline">이용약관</span> 및{' '}
        <span className="underline">개인정보 처리방침</span>에 동의하게 됩니다.
      </p>
    </div>
  )
}
