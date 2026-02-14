import { type ReactNode } from 'react'
import { BottomNavClient } from '@/components/layouts/BottomNavClient'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <main className="mx-auto w-full max-w-[480px] pb-24">{children}</main>
      <BottomNavClient />
    </div>
  )
}
