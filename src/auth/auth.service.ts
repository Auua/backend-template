import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users';
import { CreateOneUserArgs } from '@/@generated/user/create-one-user.args';
import { AuthResponse } from '@/auth/dto/auth-response';
import { User } from '@/@generated/user/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async singUp(createOneUserArgs: CreateOneUserArgs): Promise<AuthResponse> {
    const user = await this.usersService.createUser(createOneUserArgs);

    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };

    const { accessToken, refreshToken } = await this.createJwtTokens(payload);

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async login(user: User): Promise<AuthResponse> {
    if (!user) {
      throw new UnauthorizedException(
        'Sorry credentials are missing, please log in again',
      );
    }

    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };
    const { accessToken, refreshToken } = await this.createJwtTokens(payload);

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshToken(
    userId: string,
    oldRefreshToken: string,
  ): Promise<AuthResponse> {
    if (!oldRefreshToken) throw new UnauthorizedException();
    const user = await this.usersService.uniqueUser({
      where: {
        id: userId,
      },
    });
    if (!user) throw new UnauthorizedException();

    const isTokenValid = await bcrypt.compare(
      oldRefreshToken,
      user.refreshToken,
    );
    if (!isTokenValid) throw new UnauthorizedException();

    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };
    const { accessToken, refreshToken } = await this.createJwtTokens(payload);

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async logout(userId: string): Promise<boolean> {
    if (!userId) return true;
    await this.removeRefreshTokenIfDefined(userId);
    return true;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.uniqueUser({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  private async createJwtTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '30s',
        secret: this.configService.get<string>('jwtService.secretKey'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '14d',
        secret: this.configService.get<string>('jwtService.secretRefreshKey'),
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = refreshToken && (await bcrypt.hash(refreshToken, 10));
    const setObject = refreshToken ? { set: hashedToken } : { unset: true };

    await this.usersService.updateUser({
      where: { id: userId },
      data: { refreshToken: setObject },
    });
  }

  private async removeRefreshTokenIfDefined(userId: string) {
    await this.usersService.updateManyUser({
      where: {
        id: { equals: userId },
        refreshToken: { not: { equals: null } },
      },
      data: { refreshToken: { set: null } },
    });
  }
}
