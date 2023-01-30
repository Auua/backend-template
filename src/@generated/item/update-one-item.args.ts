import { ArgsType, Field } from '@nestjs/graphql';
import { ItemUpdateInput } from './item-update.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@ArgsType()
export class UpdateOneItemArgs {
  @Field(() => ItemUpdateInput, { nullable: false })
  @Type(() => ItemUpdateInput)
  @ValidateNested()
  data!: ItemUpdateInput;

  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: ItemWhereUniqueInput;
}
