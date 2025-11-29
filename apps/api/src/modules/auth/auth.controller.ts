import { Body, Controller, Post, Res } from '@nestjs/common';
import type express from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/core/dto/signup.dto';
import { LoginDto } from 'src/core/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
