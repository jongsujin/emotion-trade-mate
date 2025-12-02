import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretOrKey = process.env.JWT_ACCESS_SECRET;
    if (!secretOrKey) {
      throw new Error('JWT_ACCESS_SECRET environment variable is not set');
    }

    super({
      // 쿠키 또는 Authroizaion 헤더에서 토큰 추출
      jwtFromRequest: ExtractJwt.fromExtractors([
        //1. 쿠키에서 추출
        (req: express.Request) => req?.cookies?.accessToken,
        //2. Authorization 헤더에서 추출 (SSR)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      // 만료된 토큰 무시
      ignoreExpiration: false,
      // 토큰 검증 시크릿 키
      secretOrKey,
    });
  }
  // 토큰이 유효하면 이 메서드가 호출됨
  validate(payload: { sub: number; email: string }) {
    // payload를 requst 객체에 추가
    return { userId: payload.sub, email: payload.email };
  }
}
