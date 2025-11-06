import { ReportEmotionsProps } from '@/types/reports'

export default function ReportEmotions({
  dominantEmoji,
  dominantEmotion,
  percentage,
}: ReportEmotionsProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">가장 많이 느낀 감정</h3>
      <div className="bg-primary-50 mt-3 flex items-center justify-center gap-4 rounded-xl py-6">
        <span className="text-5xl">{dominantEmoji}</span>
        <div>
          <p className="text-xl font-bold text-gray-900">{dominantEmotion}</p>
          <p className="mt-1 text-sm text-gray-600">전체의 {percentage}%</p>
        </div>
      </div>
    </div>
  )
}
