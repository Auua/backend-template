import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class UserLoginCredentialsCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
