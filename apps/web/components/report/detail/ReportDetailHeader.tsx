import { useRouter } from 'next/navigation'

export default function ReportDetailHeader() {
  const router = useRouter()
  return (
    <div className="bg-white px-4 py-3.5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">AI 분석 리포트</h1>
      </div>
    </div>
  )
}
