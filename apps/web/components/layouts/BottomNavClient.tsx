'use client'

import dynamic from 'next/dynamic'

export const BottomNavClient = dynamic(
  () => import('@/components/layouts/BottomNav').then((mod) => mod.BottomNav),
  { ssr: false }
)
