import { ReportAIInsightsProps } from '@/types/reports'

export default function ReportAIInsights({ insights }: ReportAIInsightsProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h3 className="text-base font-semibold text-gray-900">AI 분석</h3>
      </div>

      <div className="mt-3 space-y-2">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-3 ${
              insight.type === 'positive'
                ? 'bg-green-50'
                : insight.type === 'warning'
                  ? 'bg-orange-50'
                  : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-base">
                {insight.type === 'positive' ? '✅' : insight.type === 'warning' ? '⚠️' : '💡'}
              </span>
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    insight.type === 'positive'
                      ? 'text-green-900'
                      : insight.type === 'warning'
                        ? 'text-orange-900'
                        : 'text-blue-900'
                  }`}
                >
                  {insight.title}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    insight.type === 'positive'
                      ? 'text-green-700'
                      : insight.type === 'warning'
                        ? 'text-orange-700'
                        : 'text-blue-700'
                  }`}
                >
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

