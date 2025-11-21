export default function Statistics() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <h3 className="text-[17px] font-bold text-[#191F28] mb-4">나의 기록</h3>

      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#191F28]">24</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">총 기록</p>
        </div>
        <div className="relative text-center after:absolute after:left-0 after:top-1/2 after:h-8 after:w-[1px] after:-translate-y-1/2 after:bg-[#F2F4F6] before:absolute before:right-0 before:top-1/2 before:h-8 before:w-[1px] before:-translate-y-1/2 before:bg-[#F2F4F6]">
          <p className="text-2xl font-bold text-[#191F28]">12</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">종목 수</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[#FF6B6B]">+15.3%</p>
          <p className="mt-1 text-xs font-medium text-[#8B95A1]">평균 수익률</p>
        </div>
      </div>
    </div>
  )
}
