import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthResponse } from '@/auth/dto/auth-response';
import { UserLoginCredentialsCompoundUniqueInput } from '@/@generated/user/user-login-credentials-compound-unique.input';
import { CreateOneUserArgs } from '@/@generated/user/create-one-user.args';
import { GqlAuthGuard, JwtRefreshAuthGuard } from '@/auth/guards';
import { CurrentUser, CurrentUserId, Public } from '@/auth/decorators';
import { User } from '@/@generated/user/user.model';
import { CookieOptions, Response } from 'express';

@Resolver()
export class AuthResolver {
  private cookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true,
    sameSite: 'strict',
  };

  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  signUp(
    @Args()
    createOneUserArgs: CreateOneUserArgs,
  ) {
    return this.authService.singUp(createOneUserArgs);
  }

  @Public()
  @UseGuards(GqlAuthGuard)
  @Mutation(() => AuthResponse)
  async login(
    @Args('loginUserInput')
    loginUserInput: UserLoginCredentialsCompoundUniqueInput,
    @CurrentUser() user: User,
    @Context('res') res: Response,
  ) {
    const { refreshToken, ...rest }: AuthResponse =
      await this.authService.login(user);
    res.cookie('refresh', refreshToken, this.cookieOptions);

    return rest;
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => AuthResponse)
  async refresh(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') oldRefreshToken: string,
    @Context('res') res: Response,
  ) {
    const { refreshToken, ...rest }: AuthResponse =
      await this.authService.refreshToken(userId, oldRefreshToken);
    res.cookie('refresh', refreshToken, this.cookieOptions);
    return rest;
  }

  @Mutation(() => Boolean)
  logout(@CurrentUserId() userId: string, @Context('res') res: Response) {
    res.clearCookie('refresh', this.cookieOptions);
    return this.authService.logout(userId);
  }
}
