/**
 * @description UsersEntity
 */

export class UsersEntity {
  id: number;
  nickname: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
