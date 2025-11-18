import { Injectable } from '@nestjs/common';

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
}
