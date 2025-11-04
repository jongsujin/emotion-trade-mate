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
 * handleSubmit에서 이미 빈 문자열 검증을 완료했으므로 여기서는 변환만 수행
 */
function convertFormToRequest(
  formData: JournalCreateFormData,
  emotionId: EmotionType
): JournalCreateRequest {
  // YYYY-MM-DD 형식으로 변환
  const today: string = new Date().toISOString().substring(0, 10)

  const buyPrice = Number(formData.price)
  const quantity = Number(formData.quantity)

  // 변환 실패 시 예외 (이론적으로는 발생하지 않아야 하지만 안전장치)
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
 * 감정 일지 작성 페이지 - 토스 스타일 (390px 최적화)
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

    // 폼 데이터를 API 요청 형식으로 변환
    // selectedEmotion이 null이 아니므로 타입 단언 불필요 (위에서 이미 체크함)
    const requestData: JournalCreateRequest = convertFormToRequest(formData, selectedEmotion)

    console.log('Submit:', requestData)
    // TODO: API 호출
    // await createJournal(requestData)
    router.push(ROUTES.JOURNAL.LIST)
  }

  const isFormValid = selectedEmotion && formData.symbol && formData.price && formData.quantity

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <TitleSection title="감정 일지 작성" onClick={() => router.back()} />

      {/* 폼 */}
      <JournalForm
        formData={formData}
        setFormData={setFormData}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
      />

      {/* 하단 고정 버튼 */}
      <div className="px-5">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full rounded-xl py-3.5 text-base font-semibold transition-colors ${
            isFormValid
              ? 'bg-primary-500 active:bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isFormValid ? '작성 완료' : '필수 항목을 입력해주세요'}
        </Button>
      </div>
    </div>
  )
}
