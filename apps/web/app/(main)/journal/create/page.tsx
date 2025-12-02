'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type EmotionType } from '@/constants'
import TitleSection from '@/components/common/TitleSection'
import JournalForm from '@/components/journal/create/JournalForm'
import { Button } from '@/components/common/Button'
import { useCreateJournal } from '@/features/journal'
import type { JournalCreateFormData } from '@/types/journals'
import type { CreateJournalRequest } from '@/types'

/**
 * 폼 데이터를 API 요청 데이터로 변환
 */
function convertFormToRequest(
  formData: JournalCreateFormData,
  emotionId: EmotionType
): CreateJournalRequest {
  const today = new Date().toISOString().substring(0, 10)
  const buyPrice = Number(formData.price)
  const quantity = Number(formData.quantity)

  console.log('emotionId', emotionId)
  if (isNaN(buyPrice) || isNaN(quantity)) {
    throw new Error('가격 또는 수량이 유효한 숫자가 아닙니다')
  }

  if (buyPrice <= 0 || quantity <= 0) {
    throw new Error('가격과 수량은 0보다 커야 합니다')
  }

  return {
    symbol: formData.symbol.trim(),
    symbolName: formData.symbolName.trim() || formData.symbol.trim(),
    buyPrice,
    initialQuantity: quantity,
    totalQuantity: quantity, // 최초 매수이므로 initialQuantity와 동일
    buyDate: today,
    memo: formData.memo.trim() || undefined,
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

  const { mutate: createJournal, isPending } = useCreateJournal()

  const handleSubmit = () => {
    // 유효성 검사
    if (!selectedEmotion) {
      alert('감정을 선택해주세요')
      return
    }

    if (!formData.symbol.trim()) {
      alert('종목명을 입력해주세요')
      return
    }

    if (!formData.price || !formData.quantity) {
      alert('매수가와 수량을 입력해주세요')
      return
    }

    try {
      const requestData = convertFormToRequest(formData, selectedEmotion)

      createJournal(requestData, {
        onSuccess: (response) => {
          if (response.success) {
            // 성공 시 자동으로 /journal/list로 이동 (hooks.ts에서 처리)
            console.log('일지 생성 성공:', response.data)
          } else {
            alert(response.error || '일지 생성에 실패했습니다')
          }
        },
        onError: (error) => {
          console.error('일지 생성 에러:', error)
          alert(error.message || '일지 생성 중 오류가 발생했습니다')
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('입력값을 확인해주세요')
      }
    }
  }

  const isFormValid =
    selectedEmotion && formData.symbol.trim() && formData.price && formData.quantity

  return (
    <div className="min-h-screen bg-[#F2F4F6] pb-24">
      <div className="sticky top-0 z-10 bg-[#F2F4F6]">
        <TitleSection title="일지 작성" onClick={() => router.back()} />
      </div>

      <JournalForm
        formData={formData}
        setFormData={setFormData}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
      />

      {/* 하단 고정 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 mx-auto max-w-[480px] border-t border-gray-100 bg-white p-5 pb-8 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isPending}
          fullWidth
          size="lg"
          className={`text-[17px] font-bold ${
            isFormValid && !isPending
              ? 'shadow-lg shadow-[#3182F6]/30'
              : 'bg-[#E5E8EB] text-[#B0B8C1]'
          }`}
        >
          {isPending ? '저장 중...' : isFormValid ? '작성 완료' : '내용을 입력해주세요'}
        </Button>
      </div>
    </div>
  )
}
