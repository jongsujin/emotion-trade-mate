export default function AppInfo() {
  return (
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
  )
}
