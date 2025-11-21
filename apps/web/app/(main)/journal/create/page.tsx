'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES, type EmotionType } from '@/constants'
import TitleSection from '@/components/common/TitleSection'
import JournalForm from '@/components/journal/create/JournalForm'
import type { JournalCreateFormData, JournalCreateRequest } from '@/types/journals'
import { Button } from '@/components/common/Button'

/**
 * 폼 데이터를 API 요청 데이터로 변환
 */
function convertFormToRequest(
  formData: JournalCreateFormData,
  emotionId: EmotionType
): JournalCreateRequest {
  const today: string = new Date().toISOString().substring(0, 10)
  const buyPrice = Number(formData.price)
  const quantity = Number(formData.quantity)

  if (isNaN(buyPrice) || isNaN(quantity)) {
    throw new Error('가격 또는 수량이 유효한 숫자가 아닙니다')
  }

  return {
    symbol: formData.symbol,
    symbolName: formData.symbolName || undefined,
    buyPrice,
    quantity,
    emotionId,
    memo: formData.memo || undefined,
    buyDate: today,
  }
}

/**
 * 감정 일지 작성 페이지
 */
export default function JournalCreatePage() {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)
  const [formData, setFormData] = useState<JournalCreateFormData>({
    symbol: '',
    symbolName: '',
    price: '',
    quantity: '',
    memo: '',
  })

  const handleSubmit = () => {
    if (!selectedEmotion || !formData.symbol || !formData.price || !formData.quantity) {
      alert('필수 항목을 입력해주세요')
      return
    }

    try {
      const requestData = convertFormToRequest(formData, selectedEmotion)
      console.log('Submit:', requestData)
      // TODO: API 호출
      router.push(ROUTES.JOURNAL.LIST)
    } catch (e) {
      alert('입력값을 확인해주세요')
    }
  }

  const isFormValid = selectedEmotion && formData.symbol && formData.price && formData.quantity

  return (
    <div className="min-h-screen bg-[#F2F4F6] pb-24">
      <div className="bg-[#F2F4F6] sticky top-0 z-10">
        <TitleSection title="일지 작성" onClick={() => router.back()} />
      </div>

      <JournalForm
        formData={formData}
        setFormData={setFormData}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
      />

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 max-w-[480px] mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          fullWidth
          size="lg"
          className={`text-[17px] font-bold ${
            isFormValid ? 'shadow-lg shadow-[#3182F6]/30' : 'bg-[#E5E8EB] text-[#B0B8C1]'
          }`}
        >
          {isFormValid ? '작성 완료' : '내용을 입력해주세요'}
        </Button>
      </div>
    </div>
  )
}
