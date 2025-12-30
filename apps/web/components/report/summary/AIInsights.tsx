import { ReportSummaryProps } from '@/types/reports'

export default function AIInsights({ insights }: ReportSummaryProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <h3 className="text-[17px] font-bold text-[#191F28]">AI 인사이트</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-3 rounded-2xl bg-[#EFF6FF] p-4">
            <span className="text-lg">💡</span>
            <p className="flex-1 text-sm leading-relaxed font-medium text-[#1E40AF]">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
