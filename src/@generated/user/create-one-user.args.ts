import { ArgsType, Field } from '@nestjs/graphql';
import { UserCreateInput } from './user-create.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateOneUserArgs {
  @Field(() => UserCreateInput, { nullable: false })
  @Type(() => UserCreateInput)
  @ValidateNested()
  data!: UserCreateInput;
}