'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import JournalForm from '@/components/journal/create/JournalForm'
import { Button } from '@/components/common/Button'
import { useCreateJournal } from '@/features/journal'
import type { JournalCreateFormData } from '@/types/journals'
import type { CreateJournalRequest } from '@/types'

function convertFormToRequest(
  formData: JournalCreateFormData,
  selectedEmotion: string | null
): CreateJournalRequest {
  const today = new Date().toISOString().substring(0, 10)
  const buyPrice = Number(formData.price)
  const quantity = Number(formData.quantity)

  if (Number.isNaN(buyPrice) || Number.isNaN(quantity)) {
    throw new Error('가격 또는 수량이 유효한 숫자가 아닙니다')
  }

  if (buyPrice <= 0 || quantity <= 0) {
    throw new Error('가격과 수량은 0보다 커야 합니다')
  }

  return {
    symbol: formData.symbol.trim().toUpperCase(),
    symbolName: formData.symbolName.trim() || formData.symbol.trim().toUpperCase(),
    buyPrice,
    initialQuantity: quantity,
    buyDate: today,
    firstEmotion: selectedEmotion
      ? {
          price: buyPrice,
          memo: formData.memo.trim() || undefined,
          emotionCodes: [selectedEmotion],
        }
      : undefined,
  }
}

export default function JournalCreatePage() {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [formData, setFormData] = useState<JournalCreateFormData>({
    symbol: '',
    symbolName: '',
    price: '',
    quantity: '',
    memo: '',
  })

  const { mutate: createJournal, isPending } = useCreateJournal()

  const handleSubmit = () => {
    if (!selectedEmotion) {
      alert('감정을 선택해주세요')
      return
    }

    if (!formData.symbol.trim()) {
      alert('종목 심볼을 입력해주세요')
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
          if (!response.success) {
            alert(response.error || '일지 생성에 실패했습니다')
          }
        },
        onError: (error) => {
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
    !!selectedEmotion &&
    formData.symbol.trim().length > 0 &&
    formData.price.trim().length > 0 &&
    formData.quantity.trim().length > 0

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-36">
      <header className="sticky top-0 z-20 border-b border-[#e2e8f0] bg-[rgba(246,247,248,0.9)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[480px] items-center justify-between px-4 py-4">
          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#334155]"
          >
            취소
          </button>
          <h1 className="text-lg font-semibold tracking-[-0.02em] text-[#1e293b]">새 기록</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-[480px]">
        <JournalForm
          formData={formData}
          setFormData={setFormData}
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
        />
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-30 mx-auto max-w-[480px] border-t border-[#e2e8f0] bg-[rgba(246,247,248,0.92)] p-4 pb-8 backdrop-blur-md">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isPending}
          fullWidth
          size="lg"
          className="h-14 rounded-xl text-base font-semibold shadow-[0_10px_15px_-3px_rgba(103,204,244,0.3),0_4px_6px_-4px_rgba(103,204,244,0.3)]"
        >
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isPending ? '저장 중...' : '일지 저장하기'}
          </span>
        </Button>
      </div>
    </div>
  )
}
