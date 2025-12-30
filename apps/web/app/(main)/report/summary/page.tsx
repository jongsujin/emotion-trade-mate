'use client'

import { useRouter } from 'next/navigation'
import TitleSection from '@/components/common/TitleSection'
import { MOCK_SUMMARY } from '@/constants/reports'
import {
  ProfitSummary,
  StockComparison,
  EmotionStats,
  AIInsights,
  StockReportList,
  PdfDownloadButton,
} from '@/components/report/summary'

/**
 * 전체 감정 요약 리포트 페이지
 * Pastel Tone + Toss Layout
 */
export default function ReportSummaryPage() {
  const router = useRouter()

  const handlePdfDownload = () => {
    // TODO: PDF 다운로드 로직 구현
    console.log('PDF 다운로드')
  }

  return (
    <section className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title="감정 리포트" onClick={() => router.back()} />
      </div>

      <div className="space-y-4 px-5 pt-2">
        <ProfitSummary
          emotionStats={MOCK_SUMMARY.emotionStats}
          bestSymbol={MOCK_SUMMARY.bestSymbol}
          worstSymbol={MOCK_SUMMARY.worstSymbol}
          insights={MOCK_SUMMARY.insights}
          period={MOCK_SUMMARY.period}
          totalProfit={MOCK_SUMMARY.totalProfit}
          avgReturnRate={MOCK_SUMMARY.avgReturnRate}
          totalRecords={MOCK_SUMMARY.totalRecords}
          totalSymbols={MOCK_SUMMARY.totalSymbols}
        />

        <StockComparison
          bestSymbol={MOCK_SUMMARY.bestSymbol}
          worstSymbol={MOCK_SUMMARY.worstSymbol}
        />

        <EmotionStats stats={MOCK_SUMMARY.emotionStats} />

        <AIInsights
          totalRecords={MOCK_SUMMARY.totalRecords}
          totalSymbols={MOCK_SUMMARY.totalSymbols}
          avgReturnRate={MOCK_SUMMARY.avgReturnRate}
          totalProfit={MOCK_SUMMARY.totalProfit}
          period={MOCK_SUMMARY.period}
          emotionStats={MOCK_SUMMARY.emotionStats}
          bestSymbol={MOCK_SUMMARY.bestSymbol}
          worstSymbol={MOCK_SUMMARY.worstSymbol}
          insights={MOCK_SUMMARY.insights}
        />

        <StockReportList symbols={['AAPL', 'TSLA', 'NVDA']} />

        <PdfDownloadButton onClick={handlePdfDownload} />
      </div>
    </section>
  )
}
