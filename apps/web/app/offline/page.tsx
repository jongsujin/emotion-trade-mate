export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900">오프라인 상태예요</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          네트워크 연결이 복구되면 자동으로 최신 데이터를 불러올 수 있어요.
        </p>
        <p className="mt-4 text-xs text-gray-400">EmotionTrade PWA</p>
      </div>
    </div>
  )
}


