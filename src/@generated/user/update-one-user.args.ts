import { ArgsType, Field } from '@nestjs/graphql';
import { UserUpdateInput } from './user-update.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class UpdateOneUserArgs {
  @Field(() => UserUpdateInput, { nullable: false })
  @Type(() => UserUpdateInput)
  @ValidateNested()
  data!: UserUpdateInput;

  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;
}
