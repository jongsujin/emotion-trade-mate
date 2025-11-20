import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
  private readonly users = [
    {
      id: 1,
      nickname: 'john',
      email: 'john@example.com',
      password: 'changeme',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      nickname: 'maria',
      email: 'maria@example.com',
      password: 'guess',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findOne(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
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
}
