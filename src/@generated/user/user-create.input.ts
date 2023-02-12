import { Field, HideField, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import * as CustomValidator from '@/common/validations';

@InputType()
export class UserCreateInput {
  @HideField()
  id?: string;

  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  email!: string;

  @Field(() => String, { nullable: false })
  @CustomValidator.IsValidString()
  name!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @HideField()
  createdAt?: Date | string;

  @HideField()
  updatedAt?: Date | string;
}
