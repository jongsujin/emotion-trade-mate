import { DatabaseService } from '../../core/database/database.service';
import { CreateJournalEventDto } from '../../core/dto/journals.dto';
import { JournalStatus } from './entities/journals.entities';
import { JournalsRepository } from './journals.repository';

type JournalSnapshot = {
  total_quantity: number;
  total_cost: number;
  realized_profit: number;
};

function createRepositoryWithMockedClient(snapshot: JournalSnapshot) {
  const client = {
    query: jest.fn(),
  };

  client.query.mockImplementation((sql: string) => {
    if (sql.includes('SELECT total_quantity, total_cost, realized_profit')) {
      return Promise.resolve({ rows: [snapshot] });
    }

    if (sql.includes('INSERT INTO journal_events')) {
      return Promise.resolve({
        rows: [
          {
            id: 101,
            journalId: 1,
            type: 'BUY',
            price: 100,
            quantity: 1,
            memo: null,
            createdAt: new Date('2026-02-13T00:00:00.000Z'),
            updatedAt: new Date('2026-02-13T00:00:00.000Z'),
          },
        ],
      });
    }

    if (sql.includes('UPDATE journals')) {
      return Promise.resolve({ rows: [] });
    }

    return Promise.resolve({ rows: [] });
  });

  const databaseService = {
    transaction: jest.fn(async (callback: (mockClient: typeof client) => Promise<unknown>) =>
      callback(client),
    ),
  } as unknown as DatabaseService;

  const repository = new JournalsRepository(databaseService);

  return {
    repository,
    client,
  };
}

describe('JournalsRepository.createEvent', () => {
  it('BUY 이벤트 시 totalQuantity/totalCost/averageCost를 증가시킨다', async () => {
    const { repository, client } = createRepositoryWithMockedClient({
      total_quantity: 10,
      total_cost: 1000,
      realized_profit: 100,
    });

    const event: CreateJournalEventDto = {
      type: 'BUY',
      price: 120,
      quantity: 2,
    };

    await repository.createEvent(1, 1, event);

    const updateCall = client.query.mock.calls.find(
      ([sql]) => typeof sql === 'string' && sql.includes('UPDATE journals'),
    );
    expect(updateCall).toBeDefined();

    const params = updateCall?.[1] as unknown[];
    expect(params[0]).toBe(12);
    expect(Number(params[1])).toBe(1240);
    expect(Number(params[2])).toBeCloseTo(103.3333, 3);
    expect(Number(params[3])).toBe(100);
    expect(params[4]).toBe(JournalStatus.OPEN);
  });

  it('SELL 이벤트 시 실현손익을 반영하고 수량을 차감한다', async () => {
    const { repository, client } = createRepositoryWithMockedClient({
      total_quantity: 10,
      total_cost: 1000,
      realized_profit: 100,
    });

    const event: CreateJournalEventDto = {
      type: 'SELL',
      price: 150,
      quantity: 4,
    };

    await repository.createEvent(1, 1, event);

    const updateCall = client.query.mock.calls.find(
      ([sql]) => typeof sql === 'string' && sql.includes('UPDATE journals'),
    );
    expect(updateCall).toBeDefined();

    const params = updateCall?.[1] as unknown[];
    expect(params[0]).toBe(6);
    expect(Number(params[1])).toBeCloseTo(600, 6);
    expect(Number(params[2])).toBeCloseTo(100, 6);
    expect(Number(params[3])).toBeCloseTo(300, 6);
    expect(params[4]).toBe(JournalStatus.OPEN);
  });

  it('전량 SELL 이벤트 시 status를 CLOSED로 변경한다', async () => {
    const { repository, client } = createRepositoryWithMockedClient({
      total_quantity: 5,
      total_cost: 500,
      realized_profit: 50,
    });

    const event: CreateJournalEventDto = {
      type: 'SELL',
      price: 120,
      quantity: 5,
    };

    await repository.createEvent(1, 1, event);

    const updateCall = client.query.mock.calls.find(
      ([sql]) => typeof sql === 'string' && sql.includes('UPDATE journals'),
    );
    expect(updateCall).toBeDefined();

    const params = updateCall?.[1] as unknown[];
    expect(params[0]).toBe(0);
    expect(Number(params[1])).toBe(0);
    expect(Number(params[2])).toBe(0);
    expect(Number(params[3])).toBeCloseTo(150, 6);
    expect(params[4]).toBe(JournalStatus.CLOSED);
  });

  it('보유 수량을 초과한 SELL은 에러를 반환한다', async () => {
    const { repository, client } = createRepositoryWithMockedClient({
      total_quantity: 3,
      total_cost: 300,
      realized_profit: 0,
    });

    const event: CreateJournalEventDto = {
      type: 'SELL',
      price: 100,
      quantity: 4,
    };

    await expect(repository.createEvent(1, 1, event)).rejects.toThrow(
      'SELL 수량이 현재 보유 수량을 초과합니다.',
    );

    const hasInsertCall = client.query.mock.calls.some(
      ([sql]) => typeof sql === 'string' && sql.includes('INSERT INTO journal_events'),
    );
    expect(hasInsertCall).toBe(false);
  });
});
