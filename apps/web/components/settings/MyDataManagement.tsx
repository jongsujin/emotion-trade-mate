export default function MyDataManagement() {
  return (
    <div className="rounded-3xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <button className="flex w-full items-center justify-between rounded-2xl p-4 transition-all hover:bg-[#F2F4F6] active:scale-[0.98]">
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <p className="text-[15px] font-medium text-[#333D4B]">데이터 내보내기</p>
        </div>
        <span className="text-[#B0B8C1]">›</span>
      </button>

      <div className="mx-4 h-px bg-[#F2F4F6]" />

      <button className="flex w-full items-center justify-between rounded-2xl p-4 transition-all hover:bg-[#F2F4F6] active:scale-[0.98]">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗑️</span>
          <p className="text-[15px] font-medium text-[#333D4B]">모든 데이터 삭제</p>
        </div>
        <span className="text-[#B0B8C1]">›</span>
      </button>
    </div>
  )
}
