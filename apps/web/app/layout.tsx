import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/Provider'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'

const APP_NAME = 'EmotionTrade'
const APP_DESCRIPTION = '감정 기반 투자 일지'
const THEME_COLOR = '#68CCF4'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  manifest: '/manifest.webmanifest',
  themeColor: THEME_COLOR,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  icons: {
    icon: ['/pwa-icon.svg'],
    shortcut: ['/favicon.ico'],
    // iOS Safari는 apple-touch-icon으로 SVG 지원이 제한적인 케이스가 있어 우선 ico로 연결
    apple: ['/favicon.ico'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#F2F4F6] antialiased`}>
        <Providers>
          <ServiceWorkerRegister />
          {/* Mobile First Layout Container */}
          <main className="mx-auto min-h-screen max-w-[480px] bg-[#F2F4F6] shadow-sm sm:bg-[#F2F4F6]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
