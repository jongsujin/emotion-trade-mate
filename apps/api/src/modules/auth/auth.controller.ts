import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type express from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/core/dto/signup.dto';
import { LoginDto } from 'src/core/dto/login.dto';
import { CurrentUser } from 'src/core/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/common/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { JwtRefreshGuard } from 'src/core/common/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto.email, dto.password, dto.nickname);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const tokens = await this.authService.login(dto.email, dto.password);
    // httpOnly 쿠키에 토큰 저장
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60,
      path: '/',
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      path: '/',
    });
    return {
      success: true,
      message: '로그인 성공',
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    this.authService.logout(res);
    return {
      success: true,
      message: '로그아웃 성공',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // JWT 인증 필요
  async getMe(@CurrentUser() user: { userId: number; email: string }) {
    const userInfo = await this.usersService.findById(user.userId);

    if (!userInfo) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다');
    }

    return {
      id: userInfo.id,
      email: userInfo.email,
      nickname: userInfo.nickname,
      createdAt: userInfo.createdAt,
    };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refreshTokens(
    @CurrentUser() user: { userId: number; email: string },
    @Res({ passthrough: true }) res: express.Response,
  ) {
    // user 객체의 구조를 맞춰줘야 함 (id, email)
    const userForToken = { id: user.userId, email: user.email };
    const tokens = this.authService.issueTokens(userForToken);

    // 새로운 토큰으로 쿠키 업데이트
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60, // 1시간
      path: '/',
    });

    return {
      success: true,
      message: '토큰 재발급 성공',
    };
  }
}
