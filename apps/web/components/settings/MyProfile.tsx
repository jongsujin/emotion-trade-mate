export default function MyProfile() {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="from-primary-400 to-primary-600 flex h-14 w-14 items-center justify-center rounded-full">
          <span className="text-2xl text-white">👤</span>
        </div>
        <div className="flex-1">
          <p className="text-base font-bold text-gray-900">투자자</p>
          <p className="text-sm text-gray-600">investor@example.com</p>
        </div>
        <button className="rounded-lg bg-gray-100 px-3.5 py-2 text-sm font-medium text-gray-700 active:bg-gray-200">
          편집
        </button>
      </div>
    </div>
  )
}
