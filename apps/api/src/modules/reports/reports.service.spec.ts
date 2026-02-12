import { ReportsRepository } from './reports.repository';
import { ReportsService } from './reports.service';
import { FxService } from '../fx/fx.service';

describe('ReportsService', () => {
  function createService() {
    const reportsRepository = {
      getEmotionPerformance: jest.fn(),
      getDashboardSummary: jest.fn(),
      getRecentPnl: jest.fn(),
      getTodayEmotion: jest.fn(),
    } as unknown as jest.Mocked<ReportsRepository>;

    const fxService = {
      getUsdKrwRate: jest.fn(),
    } as unknown as jest.Mocked<FxService>;

    const service = new ReportsService(reportsRepository, fxService);
    return { service, reportsRepository, fxService };
  }

  it('getDashboard는 환율을 주입해 KRW 기준 응답 + fx 메타데이터를 반환한다', async () => {
    const { service, reportsRepository, fxService } = createService();

    fxService.getUsdKrwRate.mockResolvedValue({
      rate: 1320.5,
      updatedAt: '2026-02-13T00:00:00.000Z',
      isStale: false,
      source: 'cache',
    });

    reportsRepository.getDashboardSummary.mockResolvedValue({
      realizedProfit: 1000000,
      unrealizedProfit: -150000,
      totalCost: 2500000,
      tradeCount: '4',
      winCount: '2',
    });
    reportsRepository.getRecentPnl.mockResolvedValue([
      { date: '2026-02-12', profit: 120000 },
    ]);
    reportsRepository.getTodayEmotion.mockResolvedValue({
      code: 'FEAR',
      label: '공포',
      count: '3',
    });

    const result = await service.getDashboard(1);

    expect(reportsRepository.getDashboardSummary).toHaveBeenCalledWith(1, 1320.5);
    expect(reportsRepository.getRecentPnl).toHaveBeenCalledWith(1, 1320.5);
    expect(result.summary.totalProfit).toBe(850000);
    expect(result.summary.tradeCount).toBe(4);
    expect(result.summary.winRate).toBe(50);
    expect(result.fx).toEqual({
      baseCurrency: 'KRW',
      quoteCurrency: 'USD',
      usdKrwRate: 1320.5,
      updatedAt: '2026-02-13T00:00:00.000Z',
      stale: false,
      source: 'cache',
    });
  });

  it('getEmotionPerformance는 환율을 전달하여 집계한다', async () => {
    const { service, reportsRepository, fxService } = createService();

    fxService.getUsdKrwRate.mockResolvedValue({
      rate: 1311,
      updatedAt: '2026-02-13T01:00:00.000Z',
      isStale: false,
      source: 'live',
    });
    reportsRepository.getEmotionPerformance.mockResolvedValue([
      {
        code: 'CONFIDENT',
        label: '자신감',
        tradeCount: 2,
        winRate: 50,
        avgProfit: 120000,
      },
    ]);

    const result = await service.getEmotionPerformance(9);

    expect(reportsRepository.getEmotionPerformance).toHaveBeenCalledWith(9, 1311);
    expect(result.bestEmotion?.code).toBe('CONFIDENT');
    expect(result.worstEmotion?.code).toBe('CONFIDENT');
  });
});
