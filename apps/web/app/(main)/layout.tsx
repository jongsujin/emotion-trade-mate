import { type ReactNode } from 'react'
import { BottomNav } from '@/components/layouts/BottomNav'
import MainHeader from '@/components/common/MainHeader'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background-primary min-h-screen pb-20">
      {/* 헤더 */}
      <MainHeader />

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>

      {/* 하단 네비게이션 (모바일) */}
      <BottomNav />
    </div>
  )
}
