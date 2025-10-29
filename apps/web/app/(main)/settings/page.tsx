'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      <div className="bg-white px-4 py-3.5">
        <h1 className="text-lg font-bold text-gray-900">설정</h1>
      </div>

      <div className="space-y-3 px-4 py-5">
        {/* 프로필 */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="from-primary-400 to-primary-600 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br">
              <span className="text-2xl text-white">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">투자자</p>
              <p className="text-sm text-gray-600">investor@example.com</p>
            </div>
            <button className="rounded-lg bg-gray-100 px-3.5 py-2 text-sm font-medium text-gray-700 active:bg-gray-200">
              편집
            </button>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="rounded-2xl bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-900">알림</h3>
          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className="flex w-full items-center justify-between p-4 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">푸시 알림</p>
                <p className="text-sm text-gray-600">일지 작성 리마인더</p>
              </div>
            </div>
            <div
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notifications ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <div
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* 통계 */}
        <div className="rounded-2xl bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-900">나의 기록</h3>
          </div>

          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-3.5 text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="mt-1 text-xs text-gray-600">총 기록</p>
            </div>
            <div className="p-3.5 text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="mt-1 text-xs text-gray-600">종목 수</p>
            </div>
            <div className="p-3.5 text-center">
              <p className="text-2xl font-bold text-red-500">+15.3%</p>
              <p className="mt-1 text-xs text-gray-600">평균 수익률</p>
            </div>
          </div>
        </div>

        {/* 데이터 관리 */}
        <div className="rounded-2xl bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-900">데이터</h3>
          </div>

          <button className="flex w-full items-center justify-between border-b border-gray-100 p-4 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <p className="font-medium text-gray-900">데이터 내보내기</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="flex w-full items-center justify-between p-4 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-xl">🗑️</span>
              <p className="font-medium text-gray-900">모든 데이터 삭제</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* 앱 정보 */}
        <div className="rounded-2xl bg-white">
          <button className="flex w-full items-center justify-between border-b border-gray-100 p-4 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-xl">📱</span>
              <p className="font-medium text-gray-900">앱 버전</p>
            </div>
            <span className="text-sm text-gray-600">1.0.0</span>
          </button>

          <button className="flex w-full items-center justify-between border-b border-gray-100 p-4 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-xl">📄</span>
              <p className="font-medium text-gray-900">이용약관</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="flex w-full items-center justify-between p-4 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <p className="font-medium text-gray-900">개인정보 처리방침</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl bg-white p-4 text-center font-medium text-gray-900 active:bg-gray-50"
        >
          로그아웃
        </button>

        {/* 탈퇴 */}
        <button
          onClick={handleDeleteAccount}
          className="w-full rounded-2xl bg-white p-4 text-center text-sm text-gray-500 active:bg-gray-50"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
