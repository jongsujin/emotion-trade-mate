import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/common/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/core/common/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET ?? 'default-secret',
      signOptions: { expiresIn: '1h' },
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET ?? 'default-secret',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule.register({
      secret: process.env.JWT_ACCESS_SECRET ?? 'default-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
