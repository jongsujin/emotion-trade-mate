export default function MyDataManagement() {
  return (
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
  )
}
