import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/@generated/user/user.model';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken?: string;

  @Field(() => User, { nullable: false })
  user!: User;
}
