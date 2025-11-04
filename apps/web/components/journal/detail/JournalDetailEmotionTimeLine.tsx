import { JournalDetailEmotionTimeLineProps } from '@/types/journals'

/**
 * @description 감정 기록 타임라인 컴포넌트
 * @param totalRecords 총 감정 기록 횟수
 * @param emotionHistory 감정 기록 배열
 * @param buyPrice 매수 가격 (가격 차이 계산용)
 */
export default function JournalDetailEmotionTimeLine({
  totalRecords,
  emotionHistory,
  buyPrice,
}: JournalDetailEmotionTimeLineProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📊</span>
          <h3 className="text-base font-semibold text-gray-900">감정 기록</h3>
        </div>
        <span className="text-sm text-gray-600">{totalRecords}회</span>
      </div>

      <div className="mt-4 space-y-3">
        {emotionHistory.map((record, idx) => {
          const priceDiff =
            idx < emotionHistory.length - 1
              ? record.price - (emotionHistory[idx + 1]?.price ?? 0)
              : record.price - buyPrice

          return (
            <div key={idx} className="rounded-xl bg-gray-50 p-3">
              {/* 헤더 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{record.emotion}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{record.date}</p>
                    <p className="text-xs text-gray-600">{record.emotionLabel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">${record.price}</p>
                  {idx < emotionHistory.length - 1 && (
                    <p
                      className={`text-xs font-medium ${
                        priceDiff >= 0 ? 'text-red-500' : 'text-blue-500'
                      }`}
                    >
                      {priceDiff >= 0 ? '+' : ''}${priceDiff.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {/* 메모 */}
              {record.memo && (
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{record.memo}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
