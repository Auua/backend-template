import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '@/users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JwtTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from '@/auth/strategies';
import { GqlAuthGuard, JwtAuthGuard } from '@/auth/guards';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    ConfigModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtService.secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtTokenStrategy,
    GqlAuthGuard,
    JwtAuthGuard,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
