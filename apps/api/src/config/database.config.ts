import { PoolConfig } from 'pg';

export const databaseConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: String(process.env.DB_USER || 'postgres'),
  password: String(process.env.DB_PASSWORD || ''),
  database: String(process.env.DB_NAME || 'postgres'),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // 커넥션 풀 최대 크기
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
