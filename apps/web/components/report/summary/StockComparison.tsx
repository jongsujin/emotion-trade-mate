import { BestSymbolProps, WorstSymbolProps } from '@/types/reports'
import { formatPercent } from '@/lib/utils'

export interface StockComparisonProps {
  bestSymbol: BestSymbolProps | null
  worstSymbol: WorstSymbolProps | null
}

export default function StockComparison({ bestSymbol, worstSymbol }: StockComparisonProps) {
  if (!bestSymbol || !worstSymbol) {
    return (
      <div className="rounded-3xl bg-white p-5 text-sm text-[#6B7280] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        종목별 성과 비교를 위한 데이터가 부족합니다.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 최고 */}
      <div className="rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
          <span>👑</span>
          <span>최고의 선택</span>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F0]">
            <span className="text-2xl">{bestSymbol.emoji}</span>
          </div>
          <p className="text-[15px] font-bold text-[#191F28]">{bestSymbol.symbol}</p>
          <p className="mt-0.5 text-sm font-bold text-[#FF6B6B]">
            {formatPercent(bestSymbol.return, { withSign: true, maximumFractionDigits: 1 })}
          </p>
        </div>
      </div>

      {/* 최악 */}
      <div className="rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
          <span>💔</span>
          <span>아쉬운 선택</span>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F7FF]">
            <span className="text-2xl">{worstSymbol.emoji}</span>
          </div>
          <p className="text-[15px] font-bold text-[#191F28]">{worstSymbol.symbol}</p>
          <p className="mt-0.5 text-sm font-bold text-[#6C9EFF]">
            {formatPercent(worstSymbol.return, { withSign: true, maximumFractionDigits: 1 })}
          </p>
        </div>
      </div>
    </div>
  )
}
