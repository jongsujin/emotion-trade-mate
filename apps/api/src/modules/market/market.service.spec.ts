import { DatabaseService } from '../../core/database/database.service';
import { UPDATE_CURRENT_PRICE_QUERY } from '../../core/database/sql/market/query';
import { MarketService } from './market.service';

describe('MarketService.updateMarketPrices', () => {
  function createService() {
    const query = jest.fn();
    const databaseService = { query } as unknown as DatabaseService;
    const service = new MarketService(databaseService);
    const yahooFinance = {
      quote: jest.fn(),
      search: jest.fn(),
    };

    (service as any).yahooFinance = yahooFinance;
    (service as any).delay = jest.fn().mockResolvedValue(undefined);

    return { service, query, yahooFinance };
  }

  it('최근에 갱신된 가격은 외부 시세 API를 호출하지 않는다', async () => {
    const { service, query, yahooFinance } = createService();
    const freshUpdatedAt = new Date(Date.now() - 2 * 60 * 1000); // 2분 전

    query.mockResolvedValueOnce([
      {
        id: 1,
        symbol: 'AAPL',
        priceUpdatedAt: freshUpdatedAt,
      },
    ]);

    await service.updateMarketPrices();

    expect(yahooFinance.quote).not.toHaveBeenCalled();
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('stale 심볼은 1회 조회 후 같은 심볼 일지를 모두 갱신한다', async () => {
    const { service, query, yahooFinance } = createService();
    const staleUpdatedAt = new Date(Date.now() - 11 * 60 * 1000); // 11분 전
    const freshUpdatedAt = new Date();

    query.mockResolvedValue([]);
    query.mockResolvedValueOnce([
      { id: 10, symbol: 'AAPL', priceUpdatedAt: staleUpdatedAt },
      { id: 20, symbol: 'AAPL', priceUpdatedAt: freshUpdatedAt },
    ]);
    yahooFinance.quote.mockResolvedValue({ regularMarketPrice: 210.5 });

    await service.updateMarketPrices();

    expect(yahooFinance.quote).toHaveBeenCalledWith('AAPL');
    expect(query).toHaveBeenNthCalledWith(2, UPDATE_CURRENT_PRICE_QUERY, [
      10,
      210.5,
    ]);
    expect(query).toHaveBeenNthCalledWith(3, UPDATE_CURRENT_PRICE_QUERY, [
      20,
      210.5,
    ]);
  });
});

describe('MarketService.handleCron', () => {
  function createService() {
    const query = jest.fn();
    const databaseService = { query } as unknown as DatabaseService;
    return new MarketService(databaseService);
  }

  it('이전 작업이 진행 중이면 이번 cron tick을 건너뛴다', async () => {
    const service = createService();
    const updateSpy = jest
      .spyOn(service, 'updateMarketPrices')
      .mockResolvedValue(undefined);

    (service as any).isUpdating = true;

    await service.handleCron();

    expect(updateSpy).not.toHaveBeenCalled();
  });
});
