'use client'

import { EMOTION_DATA } from '@/constants'
import type { JournalFormProps } from '@/types/journals'
import { Card } from '@/components/common/Card'

export default function JournalForm({
  formData,
  setFormData,
  selectedEmotion,
  setSelectedEmotion,
}: JournalFormProps) {
  return (
    <div className="space-y-4 px-5 pt-2">
      {/* 1. 종목 정보 입력 */}
      <Card className="p-6">
        <h2 className="mb-6 text-[17px] font-bold text-[#191F28]">어떤 종목을 거래하셨나요?</h2>

        <div className="space-y-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4E5968]">종목명</label>
            <input
              type="text"
              placeholder="예: 삼성전자, TSLA"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              className="w-full rounded-none border-b-2 border-[#E5E8EB] bg-transparent py-2 text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] transition-colors focus:border-[#3182F6] focus:outline-none"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-[#4E5968]">매수가</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-none border-b-2 border-[#E5E8EB] bg-transparent py-2 pr-7 text-right text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] transition-colors focus:border-[#3182F6] focus:outline-none"
                />
                <span className="absolute top-2.5 right-0 font-medium text-[#4E5968]">원</span>
              </div>
            </div>
            <div className="w-24">
              <label className="mb-2 block text-sm font-semibold text-[#4E5968]">수량</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full rounded-none border-b-2 border-[#E5E8EB] bg-transparent py-2 pr-7 text-right text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] transition-colors focus:border-[#3182F6] focus:outline-none"
                />
                <span className="absolute top-2.5 right-0 font-medium text-[#4E5968]">주</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. 감정 선택 */}
      <Card className="p-6">
        <h2 className="mb-1 text-[17px] font-bold text-[#191F28]">그때 기분이 어땠나요?</h2>
        <p className="mb-3 text-sm text-[#8B95A1]">가장 지배적인 감정 하나를 선택해주세요</p>

        <div className="grid grid-cols-3 gap-3">
          {Object.values(EMOTION_DATA).map((emotion) => {
            const isSelected = selectedEmotion === emotion.id

            return (
              <button
                key={emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
                className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl py-5 transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#E8F3FF] text-[#1B64DA] ring-2 ring-[#3182F6]'
                    : 'cursor-pointer bg-[#F9FAFB] text-[#4E5968] hover:bg-[#F2F4F6]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3182F6]">
                    <span className="text-xs font-bold text-white">✓</span>
                  </div>
                )}
                <span className="mb-1 text-3xl drop-shadow-sm filter">{emotion.emoji}</span>
                <span className="text-sm font-bold">{emotion.label}</span>
              </button>
            )
          })}
        </div>

        {selectedEmotion && (
          <div className="mt-4 rounded-lg bg-[#F8F9FA] p-3">
            <p className="mb-2 text-sm font-medium text-[#191F28]">선택된 감정:</p>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const emotion = EMOTION_DATA[selectedEmotion as keyof typeof EMOTION_DATA]
                return (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F3FF] px-3 py-1 text-sm font-medium text-[#1B64DA]">
                    <span>{emotion.emoji}</span>
                    <span>{emotion.label}</span>
                  </span>
                )
              })()}
            </div>
          </div>
        )}
      </Card>

      {/* 3. 메모 */}
      <Card className="p-6">
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
      </Card>

      {/* AI 분석 팁 */}
      <div className="mb-8 flex items-start gap-3 px-2 py-2">
        <span className="text-xl">💡</span>
        <p className="text-sm leading-relaxed text-[#6B7684]">
          <strong className="text-[#191F28]">알고 계셨나요?</strong>
          <br />
          감정 기록이 5개 이상 쌓이면 AI가 투자 패턴을 분석해드려요.
        </p>
      </div>
    </div>
  )
}
