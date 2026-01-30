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
    const host = this.configService.get<string>('DB_HOST');
    if (!host) {
      this.logger.warn('DB_HOST is not defined. Skipping database connection.');
      return;
    }

    const dbConfig: PoolConfig = {
      host: host,
      port: this.configService.get<number>('DB_PORT', 5432),
      user: this.configService.get<string>('DB_USER', 'postgres'),
      password: this.configService.get<string>('DB_PASSWORD', ''),
      database: this.configService.get<string>('DB_NAME', 'postgres'),
      ssl: { rejectUnauthorized: false }, // Supabase requires SSL, usually with rejectUnauthorized: false for simple setups or proper CA.
      max: 1, // Serverless 환경에서는 연결 수를 최소로 제한 (Cold Start 방지 및 Connection Pool 고갈 방지)
      idleTimeoutMillis: 3000, // 유휴 연결을 빨리 끊음
      connectionTimeoutMillis: 5000,
    };

    this.logger.log(`Connecting to database at ${host}...`);
    this.pool = new Pool(dbConfig);

    // Pool 커넥션 확인
    try {
      const client = await this.pool.connect();
      this.logger.log('PostgreSQL connected successfully');
      client.release(); // 연결을 Pool로 반환
    } catch (error) {
      this.logger.error(
        `Failed to connect to PostgreSQL at ${host}: ${error instanceof Error ? error.message : String(error)}`,
      );
      // Vercel 환경에서는 여기서 에러를 throw하면 배포가 터지거나 Cold Start가 실패할 수 있음.
      // 하지만 DB 연결이 안 되면 앱이 의미가 없으므로 일단 에러는 찍되, throw는 신중해야 함.
      // 여기서는 일단 throw해서 문제를 명확히 함.
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
