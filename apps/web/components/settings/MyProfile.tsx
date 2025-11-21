export default function MyProfile() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3FF]">
          <span className="text-3xl">👤</span>
        </div>
        <div className="flex-1">
          <h2 className="text-[19px] font-bold text-[#191F28]">투자자</h2>
          <p className="text-sm text-[#8B95A1]">investor@example.com</p>
        </div>
        <button className="rounded-xl bg-[#F2F4F6] px-4 py-2 text-[13px] font-semibold text-[#4E5968] active:bg-[#E5E8EB]">
          편집
        </button>
      </div>
    </div>
  )
}
