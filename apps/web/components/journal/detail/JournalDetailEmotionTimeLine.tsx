import { JournalDetailEmotionTimeLineProps } from '@/types/journals'
import { EMOTION_DATA } from '@/constants/emotions'
import { formatPrice } from '@/lib/utils'

export default function JournalDetailEmotionTimeLine({
  totalRecords,
  emotionHistory,
  buyPrice,
}: JournalDetailEmotionTimeLineProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[17px] font-bold text-[#191F28]">
          감정 기록 <span className="ml-1 text-[#6C9EFF]">{totalRecords}</span>
        </h3>
      </div>

      <div className="relative space-y-8 border-l-2 border-[#F2F4F6] pl-4">
        {emotionHistory.map((record, idx) => {
          const recordPrice = Number(record.price)
          const priceDiff =
            idx < emotionHistory.length - 1
              ? recordPrice - (Number(emotionHistory[idx + 1]?.price) ?? 0)
              : recordPrice - buyPrice

          const isUp = priceDiff >= 0
          const createdDate = new Date(record.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <div key={record.id} className="relative">
              {/* 타임라인 도트 */}
              <div className="absolute top-1.5 -left-[21px] h-3 w-3 rounded-full bg-[#D1D6DB] ring-4 ring-white" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {record.emotions.length > 0 ? (
                      record.emotions.map((emotion, emotionIdx) => {
                        const emotionData = EMOTION_DATA[emotion.code as keyof typeof EMOTION_DATA]
                        return (
                          <div key={emotionIdx} className="flex items-center gap-1">
                            <span className="text-lg">{emotionData?.emoji || '😶'}</span>
                            <span className="text-sm font-bold text-[#191F28]">
                              {emotion.label}
                            </span>
                          </div>
                        )
                      })
                    ) : (
                      // 감정이 없는 경우 이벤트 타입별 아이콘 표시
                      <div className="flex items-center gap-1">
                        <span className="text-lg">
                          {record.type === 'BUY' ? '💰' : record.type === 'SELL' ? '💸' : '📝'}
                        </span>
                        <span className="text-sm font-bold text-[#191F28]">
                          {record.type === 'BUY'
                            ? '추가 매수'
                            : record.type === 'SELL'
                              ? '부분 매도'
                              : '메모'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#9CA3AF]">{createdDate}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs font-medium text-[#9CA3AF]">
                      {record.type === 'EMOTION'
                        ? '감정 기록'
                        : record.type === 'BUY'
                          ? '매수'
                          : record.type === 'SELL'
                            ? '매도'
                            : record.type}
                    </p>
                    {record.quantity && (
                      <p className="text-xs font-medium text-[#6C9EFF]">{record.quantity}주</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#191F28]">₩{formatPrice(recordPrice)}</p>
                  {idx < emotionHistory.length - 1 && (
                    <p
                      className={`text-xs font-medium ${isUp ? 'text-[#FF6B6B]' : 'text-[#6C9EFF]'}`}
                    >
                      {isUp ? '+' : ''}₩{formatPrice(Math.abs(priceDiff))}
                    </p>
                  )}
                </div>
              </div>

              {record.memo && (
                <div className="mt-3 rounded-xl bg-[#F9FAFB] p-3 text-sm leading-relaxed text-[#4E5968]">
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
