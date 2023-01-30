import { Field, HideField, InputType, Int } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import * as CustomValidator from '@/common/validations';

@InputType()
export class ItemCreateManyInput {
  @HideField()
  id?: string;

  @Field(() => String, { nullable: false })
  @Validator.MinLength(2)
  @CustomValidator.IsValidString()
  name!: string;

  @Field(() => String, { nullable: true })
  @CustomValidator.IsValidString()
  description?: string;

  @Field(() => Int, { nullable: true })
  count?: number;

  @HideField()
  createdAt?: Date | string;

  @HideField()
  updatedAt?: Date | string;
}
