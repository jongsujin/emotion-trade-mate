'use client'

import { EMOTION_DATA } from '@/constants'

interface EmotionAddFormData {
  price: string
  quantity: string
  memo: string
}

interface EmotionAddFormProps {
  symbol: string
  symbolName: string
  formData: EmotionAddFormData
  setFormData: React.Dispatch<React.SetStateAction<EmotionAddFormData>>
  selectedEmotions: string[]
  setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>
  onFetchPrice?: () => Promise<void>
  isLoadingPrice?: boolean
}

/**
 * 감정 추가 폼 컴포넌트
 */
export default function EmotionAddForm({
  symbol,
  symbolName,
  formData,
  setFormData,
  selectedEmotions,
  setSelectedEmotions,
}: EmotionAddFormProps) {
  return (
    <div className="space-y-4 px-5 pt-2">
      {/* 종목 정보 표시 */}
      <div className="mb-4 rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-2xl font-bold text-[#191F28]">{symbolName}</h2>
        <p className="text-sm font-medium text-[#8B95A1]">{symbol}</p>
      </div>

      {/* 감정 선택 */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="mb-1 text-[17px] font-bold text-[#191F28]">지금 기분이 어떠신가요?</h2>
        <p className="mb-3 text-sm text-[#8B95A1]">솔직한 감정이 정확한 분석을 만듭니다</p>
        <p className="mb-5 text-xs text-[#8B95A1]">최대 3개까지 선택할 수 있어요</p>

        <div className="grid grid-cols-3 gap-3">
          {Object.values(EMOTION_DATA).map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion.id)
            const isDisabled = !isSelected && selectedEmotions.length >= 3

            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    // 선택 해제
                    setSelectedEmotions(selectedEmotions.filter((id) => id !== emotion.id))
                  } else if (!isDisabled) {
                    // 선택 추가
                    setSelectedEmotions([...selectedEmotions, emotion.id])
                  }
                }}
                disabled={isDisabled && !isSelected}
                className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl py-5 transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#E8F3FF] text-[#1B64DA] ring-2 ring-[#3182F6]'
                    : isDisabled
                      ? 'cursor-not-allowed bg-[#F9FAFB] text-[#B0B8C1] opacity-50'
                      : 'cursor-pointer bg-[#F9FAFB] text-[#4E5968] hover:bg-[#F2F4F6]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3182F6]">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                )}
                <span className="text-3xl drop-shadow-sm filter">{emotion.emoji}</span>
                <span className="text-sm font-bold">{emotion.label}</span>
              </button>
            )
          })}
        </div>

        {selectedEmotions.length > 0 && (
          <div className="mt-4 rounded-lg bg-[#F8F9FA] p-3">
            <p className="mb-2 text-sm font-medium text-[#191F28]">선택된 감정:</p>
            <div className="flex flex-wrap gap-2">
              {selectedEmotions.map((emotionCode) => {
                const emotion = EMOTION_DATA[emotionCode as keyof typeof EMOTION_DATA]
                return (
                  <span
                    key={emotionCode}
                    className="inline-flex items-center gap-1 rounded-full bg-[#E8F3FF] px-3 py-1 text-sm font-medium text-[#1B64DA]"
                  >
                    <span>{emotion?.emoji}</span>
                    <span>{emotion?.label}</span>
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 메모 (선택) */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="mb-4 text-[17px] font-bold text-[#191F28]">메모하기</h2>
        <textarea
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          placeholder="매수 이유나 당시 상황을 자유롭게 적어주세요."
          maxLength={200}
          className="h-32 w-full resize-none rounded-xl bg-[#F9FAFB] p-4 text-[15px] text-[#191F28] placeholder-[#B0B8C1] focus:ring-2 focus:ring-[#3182F6]/20 focus:outline-none"
        />
        <div className="mt-2 text-right text-xs font-medium text-[#8B95A1]">
          {formData.memo.length}/200
        </div>
      </div>

      {/* 팁 카드 */}
      <div className="mb-8 flex items-start gap-3 px-2 py-2">
        <span className="text-xl">💡</span>
        <p className="text-sm leading-relaxed text-[#6B7684]">
          <strong className="text-[#191F28]">AI 투자 비서</strong>
          <br />
          감정 기록이 쌓일수록 더 정확한 투자 패턴을 분석해드려요.
        </p>
      </div>
    </div>
  )
}
