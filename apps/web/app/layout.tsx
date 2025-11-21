import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'EmotionTrade',
  description: '감정 기반 투자 일지',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F2F4F6]`}>
        {/* Mobile First Layout Container */}
        <main className="mx-auto min-h-screen max-w-[480px] bg-[#F2F4F6] shadow-sm sm:bg-[#F2F4F6]">
          {children}
        </main>
      </body>
    </html>
  )
}
