import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { UserLoginCredentialsCompoundUniqueInput } from './user-login-credentials-compound-unique.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  email?: string;

  @Field(() => UserLoginCredentialsCompoundUniqueInput, { nullable: true })
  loginCredentials?: UserLoginCredentialsCompoundUniqueInput;
}
