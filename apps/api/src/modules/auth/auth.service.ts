import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, nickname: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const passwordHash = await this.usersService.hashPassword(password);
    const user = await this.usersService.create(email, passwordHash, nickname);
    if (!user) {
      throw new InternalServerErrorException('회원가입에 실패했습니다.');
    }

    return this.issueTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    const ok = await this.usersService.comparePassword(
      password,
      user.passwordHash,
    );
    if (!ok)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    return this.issueTokens(user);
  }

  // 토큰 발급
  private issueTokens(user: { id: number; email: string }) {
    // 페이로드 생성
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_EXPIRES ?? '1h'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRES ?? '7d'),
    });

    return { accessToken, refreshToken };
  }
}
