import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient, PoolConfig } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private pool!: Pool; // Connection Pool 인스턴스

  constructor(private configService: ConfigService) {}

  /**
   * 애플리케이션 시작 시 실행 (한 번만)
   * Connection Pool 생성
   */
  async onModuleInit() {
    // ConfigService에서 환경변수 로드
    const dbConfig: PoolConfig = {
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      user: this.configService.get<string>('DB_USER', 'postgres'),
      password: this.configService.get<string>('DB_PASSWORD', ''),
      database: this.configService.get<string>('DB_NAME', 'postgres'),
      ssl:
        this.configService.get<string>('DB_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

    this.logger.log('Database configuration loaded');
    this.pool = new Pool(dbConfig);
    this.logger.log('PostgreSQL connection pool created');

    // Pool 커넥션 확인
    try {
      const client = await this.pool.connect();
      this.logger.log('PostgreSQL connected successfully');
      client.release(); // 연결을 Pool로 반환
    } catch (error) {
      this.logger.error('Failed to connect to PostgreSQL');
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * 애플리케이션 종료 시 실행
   * 모든 연결 종료
   */
  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('PostgreSQL connection pool closed');
  }

  async query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
    const result = await this.pool.query(text, params);
    return result.rows as T[];
  }

  async queryOne<T = unknown>(
    text: string,
    params?: unknown[],
  ): Promise<T | null> {
    const result = await this.pool.query(text, params);
    return (result.rows[0] as T | undefined) ?? null;
  }

  async transaction<T>(
    callback: (client: PoolClient) => Promise<T>,
  ): Promise<T> {
    const client = await this.pool.connect(); // Pool 에서 연결 가져오기
    try {
      await client.query('BEGIN'); // 트랜잭션 시작
      const result = await callback(client); // 같은 client 사용
      await client.query('COMMIT'); // 성공 시 커밋
      return result;
    } catch (error) {
      await client.query('ROLLBACK'); // 실패 시 롤백
      throw error;
    } finally {
      client.release(); // 연결을 Pool로 반환
    }
  }

  // Pool 직접 접근
  getPool(): Pool {
    return this.pool;
  }
}
