import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/Provider'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'

const APP_NAME = 'EmotionTrade'
const APP_DESCRIPTION = '감정 기반 투자 일지'
const THEME_COLOR = '#68CCF4'

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
      <body className="bg-[#F2F4F6] antialiased">
        <Providers>
          <ServiceWorkerRegister />
          <main className="mx-auto min-h-screen max-w-[480px] bg-[#F2F4F6] shadow-sm sm:bg-[#F2F4F6]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
