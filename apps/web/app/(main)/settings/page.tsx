'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TitleSection from '@/components/common/TitleSection'
import MyProfile from '@/components/settings/MyProfile'
import PushNotification from '@/components/settings/PushNotification'
import Statistics from '@/components/settings/Statistics'
import AppInfo from '@/components/settings/AppInfo'
import MyDataManagement from '@/components/settings/MyDataManagement'

/**
 * 설정 페이지 - Toss Style + Soft Pastel
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
    <div className="min-h-screen bg-[#F4F5F7] pb-32">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title="설정" />
      </div>

      <div className="space-y-4 px-5 pt-2">
        {/* 프로필 */}
        <MyProfile />

        {/* 통계 */}
        <Statistics />

        {/* 알림 설정 */}
        <PushNotification notifications={notifications} setNotifications={setNotifications} />

        {/* 데이터 관리 */}
        <MyDataManagement />

        {/* 앱 정보 */}
        <AppInfo />

        {/* 계정 관리 (로그아웃 / 탈퇴) */}
        <div className="rounded-3xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <button
            onClick={handleLogout}
            className="w-full rounded-2xl p-4 text-center text-[15px] font-medium text-[#4E5968] transition-all hover:bg-[#F2F4F6] active:scale-[0.98]"
          >
            로그아웃
          </button>
          <div className="mx-4 h-px bg-[#F2F4F6]" />
          <button
            onClick={handleDeleteAccount}
            className="w-full rounded-2xl p-4 text-center text-[15px] font-medium text-[#FF6B6B] transition-all hover:bg-[#FFF0F0] active:scale-[0.98]"
          >
            회원 탈퇴
          </button>
        </div>

        <p className="py-4 text-center text-xs text-[#B0B8C1]">EmotionTrade v1.0.0</p>
      </div>
    </div>
  )
}
