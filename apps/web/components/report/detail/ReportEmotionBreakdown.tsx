import { ReportEmotionBreakdownProps } from '@/types/reports'

export default function ReportEmotionBreakdown({
  emotionBreakdown,
}: ReportEmotionBreakdownProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">감정 분포</h3>
      <div className="mt-3 space-y-3">
        {emotionBreakdown.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{item.emotion}</span>
              <span className="text-gray-600">
                {item.count}회 ({item.percentage}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="bg-primary-500 h-full rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

