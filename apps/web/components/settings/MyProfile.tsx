import type { UserInfo } from '@/types/auth'

interface MyProfileProps {
  userInfo?: UserInfo
  isLoading?: boolean
}

export default function MyProfile({ userInfo, isLoading = false }: MyProfileProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#E8F3FF]" />
          <div className="flex-1 space-y-2">
            <div className="state-loading-skeleton h-5 w-28 rounded-lg" />
            <div className="state-loading-skeleton h-4 w-44 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  const nickname = userInfo?.nickname || '사용자'
  const email = userInfo?.email || '이메일 정보를 불러오지 못했습니다.'

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3FF]">
          <span className="text-3xl">👤</span>
        </div>
        <div className="flex-1">
          <h2 className="text-[19px] font-bold text-[#191F28]">{nickname}</h2>
          <p className="text-sm text-[#8B95A1]">{email}</p>
        </div>
      </div>
    </div>
  )
}
