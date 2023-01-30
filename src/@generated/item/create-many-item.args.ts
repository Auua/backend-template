import { ArgsType, Field } from '@nestjs/graphql';
import { ItemCreateManyInput } from './item-create-many.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateManyItemArgs {
  @Field(() => [ItemCreateManyInput], { nullable: false })
  @Type(() => ItemCreateManyInput)
  @ValidateNested()
  data!: Array<ItemCreateManyInput>;
}
