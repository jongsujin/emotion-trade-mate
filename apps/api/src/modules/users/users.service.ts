import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './entities/users.entity';

export interface User {
  id: number;
  nickname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<UsersEntity | null> {
    return this.usersRepository.findByEmail(email);
  }

  async create(email: string, password: string, nickname: string) {
    return this.usersRepository.create(email, password, nickname);
  }

  // 1. 회원가입 시 비밀번호 암호화
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // 2. 로그인 시 비밀번호 일치 여부 확인
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async findById(id: number): Promise<UsersEntity | null> {
    return this.usersRepository.findById(id);
  }

  async deleteById(id: number): Promise<boolean> {
    return this.usersRepository.deleteById(id);
  }
}
