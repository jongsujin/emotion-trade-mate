import { EmotionStatProps } from '@/types/reports'

export interface EmotionStatsProps {
  stats: EmotionStatProps[]
}

export default function EmotionStats({ stats }: EmotionStatsProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">감정별 수익률</h3>

      <div className="mt-4 space-y-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-xl bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{stat.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{stat.label}</p>
                  <p className="text-xs text-gray-600">
                    {stat.count}회 · {stat.percentage}%
                  </p>
                </div>
              </div>
              <div
                className={`text-base font-bold ${
                  stat.avgReturn >= 0 ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {stat.avgReturn >= 0 ? '+' : ''}
                {stat.avgReturn}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

