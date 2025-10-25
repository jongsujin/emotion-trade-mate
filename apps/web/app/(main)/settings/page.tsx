import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: '설정 | EmotionTrade',
  description: '계정 및 앱 설정',
}

/**
 * 설정 페이지
 * - 계정 정보 (이메일, 소셜 로그인)
 * - 알림 설정 (리마인더)
 * - 개인정보 보호정책 링크
 * - 로그아웃 버튼
 */
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="mt-2 text-gray-600">계정 및 앱 설정 관리</p>
      </div>

      {/* 계정 정보 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">계정 정보</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">이메일</p>
            <p className="mt-1 font-medium">user@example.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">가입일</p>
            <p className="mt-1 font-medium">2025년 1월 1일</p>
          </div>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">알림 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">일일 리마인더</p>
              <p className="text-sm text-gray-600">매일 감정 기록 알림</p>
            </div>
            <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm">켜기</button>
          </div>
        </div>
      </div>

      {/* 기타 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">기타</h2>
        <div className="space-y-4">
          <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left hover:bg-gray-50">
            개인정보 처리방침
          </button>
          <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left hover:bg-gray-50">
            서비스 이용약관
          </button>
          <button className="w-full rounded-lg border border-red-300 bg-white px-4 py-2 text-left text-red-600 hover:bg-red-50">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}
