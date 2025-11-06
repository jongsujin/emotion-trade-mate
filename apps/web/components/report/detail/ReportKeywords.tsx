import { ReportKeywordsProps } from '@/types/reports'

export default function ReportKeywords({ keywords }: ReportKeywordsProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">💬</span>
        <h3 className="text-base font-semibold text-gray-900">자주 쓴 단어</h3>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {keywords.map((keyword, idx) => (
          <div
            key={idx}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
          >
            {keyword.word} <span className="text-xs text-gray-500">{keyword.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

