/**
 * @description UsersEntity
 */

export class UsersEntity {
  id: number;
  nickname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
