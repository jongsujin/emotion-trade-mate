import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import express from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    const secretOrKey = process.env.JWT_REFRESH_SECRET;
    if (!secretOrKey) {
      throw new Error('JWT_REFRESH_SECRET environment variable is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: express.Request) => req?.cookies?.refreshToken,
      ]),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  validate(payload: { sub: number; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
