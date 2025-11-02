import { BestSymbolProps, WorstSymbolProps } from '@/types/reports'

export interface StockComparisonProps {
  bestSymbol: BestSymbolProps
  worstSymbol: WorstSymbolProps
}

export default function StockComparison({ bestSymbol, worstSymbol }: StockComparisonProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 최고 */}
      <div className="rounded-2xl bg-white p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span>👑</span>
          <span>최고</span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-3xl">{bestSymbol.emoji}</span>
          <p className="mt-1 text-base font-bold text-gray-900">{bestSymbol.symbol}</p>
          <p className="text-sm font-medium text-red-500">+{bestSymbol.return}%</p>
        </div>
      </div>

      {/* 최악 */}
      <div className="rounded-2xl bg-white p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span>💔</span>
          <span>최악</span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-3xl">{worstSymbol.emoji}</span>
          <p className="mt-1 text-base font-bold text-gray-900">{worstSymbol.symbol}</p>
          <p className="text-sm font-medium text-blue-500">{worstSymbol.return}%</p>
        </div>
      </div>
    </div>
  )
}
