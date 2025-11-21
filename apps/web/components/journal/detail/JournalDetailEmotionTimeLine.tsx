import { JournalDetailEmotionTimeLineProps } from '@/types/journals'

export default function JournalDetailEmotionTimeLine({
  totalRecords,
  emotionHistory,
  buyPrice,
}: JournalDetailEmotionTimeLineProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[17px] font-bold text-[#191F28]">감정 기록 <span className="text-[#6C9EFF] ml-1">{totalRecords}</span></h3>
      </div>

      <div className="relative pl-4 border-l-2 border-[#F2F4F6] space-y-8">
        {emotionHistory.map((record, idx) => {
          const priceDiff = idx < emotionHistory.length - 1
              ? record.price - (emotionHistory[idx + 1]?.price ?? 0)
              : record.price - buyPrice
          
          const isUp = priceDiff >= 0

          return (
            <div key={idx} className="relative">
              {/* 타임라인 도트 */}
              <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-[#D1D6DB] ring-4 ring-white" />
              
              <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{record.emotion}</span>
                        <span className="text-sm font-bold text-[#191F28]">{record.emotionLabel}</span>
                    </div>
                    <p className="text-xs font-medium text-[#9CA3AF]">{record.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#191F28]">₩{record.price.toLocaleString()}</p>
                  {idx < emotionHistory.length - 1 && (
                    <p className={`text-xs font-medium ${isUp ? 'text-[#FF6B6B]' : 'text-[#6C9EFF]'}`}>
                      {isUp ? '+' : ''}₩{Math.abs(priceDiff).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {record.memo && (
                <div className="mt-3 rounded-xl bg-[#F9FAFB] p-3 text-sm text-[#4E5968] leading-relaxed">
                  {record.memo}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
