export interface AIInsightsProps {
  insights: string[]
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h3 className="text-base font-semibold text-gray-900">핵심 인사이트</h3>
      </div>

      <div className="mt-3 space-y-2">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-2 rounded-xl bg-blue-50 p-3">
            <span className="text-lg">💡</span>
            <p className="flex-1 text-sm text-blue-900">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

