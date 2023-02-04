import { Field, HideField, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import * as CustomValidator from '@/common/validations';

@InputType()
export class UserCreateManyInput {
  @HideField()
  id?: string;

  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  email!: string;

  @Field(() => String, { nullable: false })
  @CustomValidator.IsValidString()
  name!: string;
}
