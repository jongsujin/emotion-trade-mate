'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TitleSection from '@/components/common/TitleSection'
import MyProfile from '@/components/settings/MyProfile'
import PushNotification from '@/components/settings/PushNotification'
import Statistics from '@/components/settings/Statistics'
import AppInfo from '@/components/settings/AppInfo'
import MyDataManagement from '@/components/settings/MyDataManagement'
import { Button } from '@/components/common'

/**
 * 설정 페이지 - 토스 스타일 (390px 최적화)
 */
export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠어요?')) {
      console.log('로그아웃')
      router.push('/')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('정말 탈퇴하시겠어요? 모든 데이터가 삭제됩니다.')) {
      console.log('회원 탈퇴')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <TitleSection title="설정" onClick={() => router.back()} />

      <div className="space-y-3 px-4 py-5">
        {/* 프로필 */}
        <MyProfile />

        {/* 알림 설정 */}
        <PushNotification notifications={notifications} setNotifications={setNotifications} />

        {/* 통계 */}
        <Statistics />

        {/* 데이터 관리 */}
        <MyDataManagement />

        {/* 앱 정보 */}
        <AppInfo />

        {/* 로그아웃 */}
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="w-full rounded-2xl bg-white p-4 text-center font-medium text-red-500 active:bg-gray-50"
        >
          로그아웃
        </Button>

        {/* 탈퇴 */}
        <Button
          variant="secondary"
          onClick={handleDeleteAccount}
          className="w-full rounded-2xl bg-white p-4 text-center text-sm text-red-500 active:bg-gray-50"
        >
          회원 탈퇴
        </Button>
      </div>
    </div>
  )
}
