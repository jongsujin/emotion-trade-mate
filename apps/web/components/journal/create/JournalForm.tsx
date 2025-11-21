import { EMOTION_DATA } from '@/constants'
import type { JournalFormProps } from '@/types/journals'
import { Card } from '@/components/common/Card'

/**
 * 일지 생성 폼 컴포넌트 (Toss Style)
 */
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
        <h2 className="text-[17px] font-bold text-[#191F28] mb-6">어떤 종목을 거래하셨나요?</h2>
        
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-[#4E5968] mb-2">종목명</label>
            <input
              type="text"
              placeholder="예: 삼성전자, TSLA"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              className="w-full border-b-2 border-[#E5E8EB] py-2 text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] focus:border-[#3182F6] focus:outline-none bg-transparent transition-colors rounded-none"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#4E5968] mb-2">매수가</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border-b-2 border-[#E5E8EB] py-2 text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] focus:border-[#3182F6] focus:outline-none bg-transparent text-right pr-7 transition-colors rounded-none"
                />
                <span className="absolute right-0 top-2.5 text-[#4E5968] font-medium">원</span>
              </div>
            </div>
            <div className="w-24">
              <label className="block text-sm font-semibold text-[#4E5968] mb-2">수량</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full border-b-2 border-[#E5E8EB] py-2 text-lg font-medium text-[#191F28] placeholder-[#B0B8C1] focus:border-[#3182F6] focus:outline-none bg-transparent text-right pr-7 transition-colors rounded-none"
                />
                <span className="absolute right-0 top-2.5 text-[#4E5968] font-medium">주</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. 감정 선택 */}
      <Card className="p-6">
        <h2 className="text-[17px] font-bold text-[#191F28] mb-1">그때 기분이 어땠나요?</h2>
        <p className="text-sm text-[#8B95A1] mb-5">솔직한 감정이 정확한 분석을 만듭니다</p>

        <div className="grid grid-cols-3 gap-3">
          {Object.values(EMOTION_DATA).map((emotion) => (
            <button
              key={emotion.id}
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
      </Card>

      {/* 3. 메모 */}
      <Card className="p-6">
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
      </Card>

      {/* AI 분석 팁 */}
      <div className="flex items-start gap-3 px-2 py-2 mb-8">
        <span className="text-xl">💡</span>
        <p className="text-sm text-[#6B7684] leading-relaxed">
          <strong className="text-[#191F28]">알고 계셨나요?</strong><br/>
          감정 기록이 5개 이상 쌓이면 AI가 투자 패턴을 분석해드려요.
        </p>
      </div>
    </div>
  )
}
