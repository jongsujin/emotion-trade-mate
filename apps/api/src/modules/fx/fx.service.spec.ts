import { FxService } from './fx.service';

describe('FxService.getUsdKrwRate', () => {
  function createService() {
    const service = new FxService();
    const yahooFinance = {
      quote: jest.fn(),
    };
    (service as any).yahooFinance = yahooFinance;
    return { service, yahooFinance };
  }

  it('실시간 조회 실패 + 캐시 없음이면 fallback 환율을 반환한다', async () => {
    const { service, yahooFinance } = createService();
    yahooFinance.quote.mockRejectedValue(new Error('network error'));

    const result = await service.getUsdKrwRate();

    expect(result.rate).toBe(1400);
    expect(result.source).toBe('fallback');
    expect(result.isStale).toBe(true);
    expect(result.updatedAt).toBeNull();
  });

  it('실시간 조회 실패 + 기존 캐시 있음이면 캐시를 반환한다', async () => {
    const { service, yahooFinance } = createService();
    (service as any).cachedRate = {
      rate: 1295.5,
      updatedAtMs: Date.now() - 1000 * 60 * 40,
    };
    yahooFinance.quote.mockRejectedValue(new Error('provider down'));

    const result = await service.getUsdKrwRate();

    expect(result.rate).toBe(1295.5);
    expect(result.source).toBe('cache');
    expect(result.isStale).toBe(true);
    expect(result.updatedAt).not.toBeNull();
  });

  it('stale 상태에서 갱신 성공 시 live 소스로 반환한다', async () => {
    const { service, yahooFinance } = createService();
    (service as any).cachedRate = {
      rate: 1290,
      updatedAtMs: Date.now() - 1000 * 60 * 40,
    };
    yahooFinance.quote.mockResolvedValue({
      regularMarketPrice: 1322.12,
    });

    const result = await service.getUsdKrwRate();

    expect(result.rate).toBe(1322.12);
    expect(result.source).toBe('live');
    expect(result.isStale).toBe(false);
  });
});
