'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import TitleSection from '@/components/common/TitleSection'
import { EmptyState } from '@/components/common/EmptyState'
import MyProfile from '@/components/settings/MyProfile'
import PushNotification from '@/components/settings/PushNotification'
import Statistics from '@/components/settings/Statistics'
import AppInfo from '@/components/settings/AppInfo'
import MyDataManagement from '@/components/settings/MyDataManagement'
import { useGetMe } from '@/features/auth/hooks'
import { deleteMe, logout } from '@/features/auth'
import { useJournals } from '@/features/journal'
import { getDashboardData } from '@/features/report'
import { ROUTES } from '@/constants'

/**
 * 설정 페이지 - Toss Style + Soft Pastel
 */
export default function SettingsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: me, isLoading: isMeLoading } = useGetMe()
  const { data: dashboardResponse, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
  const { data: journalsResponse, isLoading: isJournalsLoading } = useJournals(1, 100)

  const summary = dashboardResponse?.success ? dashboardResponse.data?.summary : undefined
  const journals = journalsResponse?.success ? journalsResponse.data?.content || [] : []
  const totalJournals = journalsResponse?.success ? journalsResponse.data?.totalCount || 0 : 0
  const activeSymbols = journals.filter((journal) => journal.totalQuantity > 0).length
  const avgReturnRate = summary && summary.totalCost > 0 ? (summary.totalProfit / summary.totalCost) * 100 : 0

  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠어요?')) return

    setActionError(null)
    setIsLoggingOut(true)
    try {
      const response = await logout()
      if (!response.success) {
        setActionError(response.error || '로그아웃에 실패했습니다.')
        return
      }

      queryClient.clear()
      router.replace(ROUTES.LOGIN)
      router.refresh()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('정말 탈퇴하시겠어요? 모든 데이터가 삭제됩니다.')) return

    setActionError(null)
    setIsDeletingAccount(true)
    try {
      const response = await deleteMe()
      if (!response.success) {
        setActionError(response.error || '회원 탈퇴에 실패했습니다.')
        return
      }

      queryClient.clear()
      router.replace(ROUTES.SIGNUP)
      router.refresh()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : '회원 탈퇴 중 오류가 발생했습니다.')
    } finally {
      setIsDeletingAccount(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-32">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title="설정" />
      </div>

      <div className="space-y-4 px-5 pt-2">
        {actionError && (
          <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
            {actionError}
          </div>
        )}

        <MyProfile userInfo={me} isLoading={isMeLoading} />

        <Statistics
          totalJournals={totalJournals}
          activeSymbols={activeSymbols}
          avgReturnRate={avgReturnRate}
          isLoading={isDashboardLoading || isJournalsLoading}
        />

        {!dashboardResponse?.success && !isDashboardLoading && (
          <EmptyState
            icon="⚠️"
            title="일부 통계를 불러오지 못했어요"
            description="잠시 후 다시 확인해주세요."
          />
        )}

        <PushNotification notifications={notifications} setNotifications={setNotifications} />

        <MyDataManagement />

        <AppInfo />

        <div className="rounded-3xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full rounded-2xl p-4 text-center text-[15px] font-medium text-[#4E5968] transition-all hover:bg-[#F2F4F6] active:scale-[0.98]"
          >
            {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
          </button>
          <div className="mx-4 h-px bg-[#F2F4F6]" />
          <button
            onClick={handleDeleteAccount}
            disabled={isDeletingAccount}
            className="w-full rounded-2xl p-4 text-center text-[15px] font-medium text-[#FF6B6B] transition-all hover:bg-[#FFF0F0] active:scale-[0.98]"
          >
            {isDeletingAccount ? '회원 탈퇴 처리 중...' : '회원 탈퇴'}
          </button>
        </div>

        <p className="py-4 text-center text-xs text-[#B0B8C1]">EmotionTrade v1.0.0</p>
      </div>
    </div>
  )
}
