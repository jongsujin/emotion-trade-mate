import { FxService } from './fx.service';

describe('FxService.getUsdKrwRate', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

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
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: () => ({}),
    } as unknown as Response);

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
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => ({}),
    } as unknown as Response);

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

  it('Yahoo 429이면 open.er-api 환율로 갱신한다', async () => {
    const { service, yahooFinance } = createService();
    (service as any).cachedRate = {
      rate: 1289,
      updatedAtMs: Date.now() - 1000 * 60 * 40,
    };
    yahooFinance.quote.mockRejectedValue(new Error('429 Too Many Requests'));
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ rates: { KRW: 1402.25 } }),
    } as unknown as Response);

    const result = await service.getUsdKrwRate();

    expect(result.rate).toBe(1402.25);
    expect(result.source).toBe('live');
    expect(result.isStale).toBe(false);
  });
});
