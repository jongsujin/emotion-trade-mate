import { CreateJournalEventDto } from '../../core/dto/journals.dto';
import { JournalStatus } from './entities/journals.entities';
import { JournalsRepository } from './journals.repository';
import { JournalsService } from './journals.service';

describe('JournalsService.createJournalEvent', () => {
  const baseJournal = {
    id: 1,
    userId: 1,
    symbol: 'AAPL',
    symbolName: 'Apple',
    buyPrice: 100,
    initialQuantity: 10,
    buyDate: new Date('2026-02-13'),
    totalQuantity: 10,
    totalCost: 1000,
    averageCost: 100,
    realizedProfit: 0,
    priceUpdatedAt: new Date('2026-02-13'),
    createdAt: new Date('2026-02-13'),
    updatedAt: new Date('2026-02-13'),
    status: JournalStatus.OPEN,
  };

  function createService() {
    const repository = {
      findById: jest.fn(),
      createEvent: jest.fn(),
      createWithFirstEmotion: jest.fn(),
      countAll: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      updateEvent: jest.fn(),
      findByIdDetail: jest.fn(),
    } as unknown as jest.Mocked<JournalsRepository>;

    const service = new JournalsService(repository);
    return { service, repository };
  }

  it('journal이 없으면 에러를 반환한다', async () => {
    const { service, repository } = createService();
    repository.findById.mockResolvedValue(null);

    const event: CreateJournalEventDto = {
      type: 'BUY',
      price: 100,
      quantity: 1,
    };

    await expect(service.createJournalEvent(1, 1, event)).rejects.toThrow(
      'Journal not found or access denied',
    );
  });

  it('BUY/SELL에서 quantity가 없으면 에러를 반환한다', async () => {
    const { service, repository } = createService();
    repository.findById.mockResolvedValue(baseJournal);

    const event: CreateJournalEventDto = {
      type: 'BUY',
      price: 100,
    };

    await expect(service.createJournalEvent(1, 1, event)).rejects.toThrow(
      'BUY/SELL 이벤트에는 quantity가 필요합니다.',
    );
  });

  it('보유 수량을 초과한 SELL은 에러를 반환한다', async () => {
    const { service, repository } = createService();
    repository.findById.mockResolvedValue({
      ...baseJournal,
      totalQuantity: 2,
    });

    const event: CreateJournalEventDto = {
      type: 'SELL',
      price: 100,
      quantity: 3,
    };

    await expect(service.createJournalEvent(1, 1, event)).rejects.toThrow(
      'SELL 수량이 현재 보유 수량을 초과합니다.',
    );
  });

  it('EMOTION 이벤트에 emotionCodes가 없으면 에러를 반환한다', async () => {
    const { service, repository } = createService();
    repository.findById.mockResolvedValue(baseJournal);

    const event: CreateJournalEventDto = {
      type: 'EMOTION',
      price: 100,
      memo: '감정만 기록',
    };

    await expect(service.createJournalEvent(1, 1, event)).rejects.toThrow(
      'EMOTION 이벤트에는 대표 감정 1개 이상이 필요합니다.',
    );
  });

  it('유효한 이벤트면 repository.createEvent를 호출한다', async () => {
    const { service, repository } = createService();
    repository.findById.mockResolvedValue(baseJournal);
    repository.createEvent.mockResolvedValue({
      id: 11,
      journalId: 1,
      type: 'BUY',
      price: 120,
      quantity: 2,
      memo: '추가 매수',
      createdAt: new Date('2026-02-13'),
      updatedAt: new Date('2026-02-13'),
    });

    const event: CreateJournalEventDto = {
      type: 'BUY',
      price: 120,
      quantity: 2,
      memo: '추가 매수',
      emotionCodes: ['CONFIDENT'],
    };

    const result = await service.createJournalEvent(1, 1, event);

    expect(repository.createEvent).toHaveBeenCalledWith(1, 1, event);
    expect(result.id).toBe(11);
  });
});
