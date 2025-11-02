'use client'

import router from 'next/router'
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
 * 전체 감정 요약 리포트 페이지 - 토스 스타일
 */
export default function ReportSummaryPage() {
  const handlePdfDownload = () => {
    // TODO: PDF 다운로드 로직 구현
    console.log('PDF 다운로드')
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <TitleSection title="전체 감정 리포트" onClick={() => router.back()} />

      <div className="space-y-3 px-4 py-5">
        <ProfitSummary
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

        <AIInsights insights={MOCK_SUMMARY.insights} />

        <StockReportList symbols={['AAPL', 'TSLA', 'NVDA']} />

        <PdfDownloadButton onClick={handlePdfDownload} />
      </div>
    </section>
  )
}
