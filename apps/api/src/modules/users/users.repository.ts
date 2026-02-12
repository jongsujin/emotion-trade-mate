import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../core/database/database.service';
import { UsersEntity } from './entities/users.entity';
import {
  FIND_BY_EMAIL_USER_QUERY,
  FIND_BY_ID_USER_QUERY,
  CREATE_USER_QUERY,
  UPDATE_USER_QUERY,
  DELETE_USER_QUERY,
} from '../../core/database/sql/users/query';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async findByEmail(email: string): Promise<UsersEntity | null> {
    const query = FIND_BY_EMAIL_USER_QUERY;
    const values = [email];
    const result = await this.databaseService.queryOne<UsersEntity>(
      query,
      values,
    );
    return result;
  }

  async create(
    email: string,
    password: string,
    nickname: string,
  ): Promise<UsersEntity | null> {
    const query = CREATE_USER_QUERY;
    const values = [nickname, email, password];
    const result = await this.databaseService.queryOne<UsersEntity>(
      query,
      values,
    );
    return result ?? null;
  }

  async findById(id: number): Promise<UsersEntity | null> {
    const query = FIND_BY_ID_USER_QUERY;
    const values = [id];
    const result = await this.databaseService.queryOne<UsersEntity>(
      query,
      values,
    );
    return result ?? null;
  }

  async update(user: UsersEntity): Promise<UsersEntity | null> {
    const query = UPDATE_USER_QUERY;
    const values = [user.id, user.nickname, user.email, user.password];
    const result = await this.databaseService.queryOne<UsersEntity>(
      query,
      values,
    );
    return result ?? null;
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.databaseService.query<{ id: number }>(
      DELETE_USER_QUERY,
      [id],
    );
    return result.length > 0;
  }
}
