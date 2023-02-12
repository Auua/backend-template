import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
      ]),
      secretOrKey: configService.get<string>('jwtService.secretRefreshKey'),
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    return req?.signedCookies?.refresh;
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req?.signedCookies?.refresh;
    return { ...payload, refreshToken };
  }
}
