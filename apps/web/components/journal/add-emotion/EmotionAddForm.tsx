'use client'

import { useState } from 'react'
import { EMOTION_DATA } from '@/constants'
import type { EmotionType } from '@/constants/emotions'
import type { EmotionAddFormData } from '@/types/journals'

interface EmotionAddFormProps {
  symbol: string
  symbolName: string
  formData: EmotionAddFormData
  setFormData: React.Dispatch<React.SetStateAction<EmotionAddFormData>>
  selectedEmotion: EmotionType | null
  setSelectedEmotion: React.Dispatch<React.SetStateAction<EmotionType | null>>
  onFetchPrice?: () => Promise<void>
  isLoadingPrice?: boolean
}

/**
 * 감정 추가 폼 컴포넌트 (Toss Style)
 */
export default function EmotionAddForm({
  symbol,
  symbolName,
  formData,
  setFormData,
  selectedEmotion,
  setSelectedEmotion,
  onFetchPrice,
  isLoadingPrice = false,
}: EmotionAddFormProps) {
  const [showAdditionalBuy, setShowAdditionalBuy] = useState(false)

  return (
    <div className="space-y-4 px-5 pt-2">
      {/* 종목 정보 표시 (심플하게) */}
      <div className="px-2">
        <h2 className="text-2xl font-bold text-[#191F28]">{symbolName}</h2>
        <p className="text-sm font-medium text-[#8B95A1]">{symbol}</p>
      </div>

      {/* 현재 시세 입력 */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center mb-4">
             <h2 className="text-[17px] font-bold text-[#191F28]">현재 시세</h2>
             {onFetchPrice && (
                <button
                    type="button"
                    onClick={onFetchPrice}
                    disabled={isLoadingPrice}
                    className="text-sm font-semibold text-[#3182F6] hover:underline disabled:opacity-50"
                >
                    {isLoadingPrice ? '조회 중...' : '자동 조회'}
                </button>
             )}
        </div>
        
        <div className="relative">
            <input
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border-b-2 border-[#E5E8EB] py-2 text-xl font-bold text-[#191F28] placeholder-[#B0B8C1] focus:border-[#3182F6] focus:outline-none bg-transparent transition-colors rounded-none"
            />
            <span className="absolute right-0 top-2.5 text-[#4E5968] font-medium">원</span>
        </div>
        <p className="mt-3 text-sm text-[#8B95A1]">오늘의 주가를 입력하거나 자동 조회하세요</p>
      </div>

      {/* 감정 선택 */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-[17px] font-bold text-[#191F28] mb-1">지금 기분이 어떠신가요?</h2>
        <p className="text-sm text-[#8B95A1] mb-5">솔직한 감정이 정확한 분석을 만듭니다</p>

        <div className="grid grid-cols-3 gap-3">
          {Object.values(EMOTION_DATA).map((emotion) => (
            <button
              key={emotion.id}
              type="button"
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl py-5 transition-all duration-200 ${
                selectedEmotion === emotion.id
                  ? 'bg-[#E8F3FF] ring-2 ring-[#3182F6] text-[#1B64DA]'
                  : 'bg-[#F9FAFB] text-[#4E5968] hover:bg-[#F2F4F6]'
              }`}
            >
              <span className="text-3xl filter drop-shadow-sm mb-1">{emotion.emoji}</span>
              <span className="text-sm font-bold">{emotion.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 추가 매수 (선택) - 토글 스타일 */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-[#191F28]">추가 매수 하셨나요?</h2>
            <p className="text-sm text-[#8B95A1]">평단가가 자동으로 계산됩니다</p>
          </div>
          
          {/* iOS Style Toggle Switch */}
          <button
            type="button"
            onClick={() => {
              setShowAdditionalBuy(!showAdditionalBuy)
              if (showAdditionalBuy) {
                setFormData({ ...formData, quantity: '' })
              }
            }}
            className={`relative h-8 w-14 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                showAdditionalBuy ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
            }`}
          >
            <span
                className={`absolute left-[2px] top-[2px] h-7 w-7 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    showAdditionalBuy ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

        {showAdditionalBuy && (
          <div className="mt-6 animate-fadeIn">
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full border-b-2 border-[#E5E8EB] py-2 text-xl font-bold text-[#191F28] placeholder-[#B0B8C1] focus:border-[#3182F6] focus:outline-none bg-transparent transition-colors rounded-none text-right pr-8"
              />
              <span className="absolute right-0 top-2.5 text-[#4E5968] font-medium">주</span>
            </div>
            <p className="mt-2 text-right text-sm text-[#3182F6] font-medium">
               매수 수량을 입력해주세요
            </p>
          </div>
        )}
      </div>

      {/* 메모 (선택) */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-[17px] font-bold text-[#191F28] mb-4">메모하기</h2>
        <textarea
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          placeholder="매수 이유나 당시 상황을 자유롭게 적어주세요."
          maxLength={200}
          className="w-full h-32 bg-[#F9FAFB] rounded-xl p-4 text-[15px] text-[#191F28] placeholder-[#B0B8C1] focus:outline-none focus:ring-2 focus:ring-[#3182F6]/20 resize-none"
        />
        <div className="mt-2 text-right text-xs text-[#8B95A1] font-medium">
          {formData.memo.length}/200
        </div>
      </div>

      {/* 팁 카드 */}
      <div className="flex items-start gap-3 px-2 py-2 mb-8">
        <span className="text-xl">💡</span>
        <p className="text-sm text-[#6B7684] leading-relaxed">
          <strong className="text-[#191F28]">AI 투자 비서</strong><br/>
          감정 기록이 쌓일수록 더 정확한 투자 패턴을 분석해드려요.
        </p>
      </div>
    </div>
  )
}
