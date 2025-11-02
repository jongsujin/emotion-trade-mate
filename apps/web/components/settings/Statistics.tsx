export default function Statistics() {
  return (
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
  )
}
