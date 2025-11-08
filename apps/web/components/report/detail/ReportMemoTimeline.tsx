import { ReportMemoTimelineProps } from '@/types/reports'

export default function ReportMemoTimeline({ memoTimeline }: ReportMemoTimelineProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">📝</span>
        <h3 className="text-base font-semibold text-gray-900">내가 쓴 메모</h3>
      </div>
      <p className="mt-1 text-xs text-gray-500">시간순으로 복기해보세요</p>

      <div className="mt-4 space-y-3">
        {memoTimeline.map((entry, idx) => (
          <div key={idx} className="rounded-xl bg-gray-50 p-3">
            {/* 헤더: 날짜 + 감정 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{entry.emotion}</span>
                <div>
                  <p className="text-xs font-medium text-gray-900">{entry.date}</p>
                  <p className="text-xs text-gray-600">{entry.emotionLabel}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  ₩{entry.price.toLocaleString()}
                </p>
                <p
                  className={`text-xs font-medium ${
                    entry.priceChange >= 0 ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  {entry.priceChange >= 0 ? '+' : ''}
                  {entry.priceChange}%
                </p>
              </div>
            </div>

            {/* 메모 내용 */}
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{entry.memo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
