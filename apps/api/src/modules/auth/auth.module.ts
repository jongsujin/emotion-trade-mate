import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
const accessExpires = Number(process.env.JWT_ACCESS_EXPIRES ?? 3600);
const refreshExpires = Number(process.env.JWT_REFRESH_EXPIRES ?? 604800);
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET ?? 'default-secret',
      signOptions: { expiresIn: accessExpires },
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET ?? 'default-secret',
      signOptions: { expiresIn: refreshExpires },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
