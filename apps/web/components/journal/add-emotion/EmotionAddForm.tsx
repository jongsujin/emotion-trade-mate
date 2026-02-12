'use client'

import { EMOTION_DATA } from '@/constants'
import { Card } from '@/components/common/Card'

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

export default function EmotionAddForm({
  formData,
  setFormData,
  selectedEmotions,
  setSelectedEmotions,
}: EmotionAddFormProps) {
  return (
    <Card className="space-y-4 rounded-2xl border border-[#f1f5f9] bg-white p-5">
      <div>
        <h3 className="text-base font-bold text-[#0f172a]">감정 선택</h3>
        <p className="mt-1 text-xs text-[#64748b]">최대 3개까지 선택할 수 있어요.</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.values(EMOTION_DATA).map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion.id)
          const isDisabled = !isSelected && selectedEmotions.length >= 3

          return (
            <button
              key={emotion.id}
              type="button"
              onClick={() => {
                if (isSelected) {
                  setSelectedEmotions(selectedEmotions.filter((id) => id !== emotion.id))
                  return
                }

                if (!isDisabled) {
                  setSelectedEmotions([...selectedEmotions, emotion.id])
                }
              }}
              disabled={isDisabled && !isSelected}
              className={
                isSelected
                  ? 'rounded-xl border-2 border-[#67ccf4] bg-[#67ccf4]/10 px-2 py-3'
                  : 'rounded-xl border border-[#e2e8f0] bg-white px-2 py-3 disabled:opacity-40'
              }
            >
              <div className="text-xl">{emotion.emoji}</div>
              <p className="mt-1 text-xs font-semibold text-[#334155]">{emotion.label}</p>
            </button>
          )
        })}
      </div>

      <div>
        <label className="text-sm font-semibold text-[#334155]">메모 (선택)</label>
        <textarea
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          placeholder="지금 감정이 든 이유를 짧게 남겨보세요."
          maxLength={240}
          className="mt-2 h-24 w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#67ccf4] focus:outline-none"
        />
        <p className="mt-2 text-right text-xs text-[#94a3b8]">{formData.memo.length}/240</p>
      </div>
    </Card>
  )
}
