import { ArgsType, Field } from '@nestjs/graphql';
import { ItemUpdateManyMutationInput } from './item-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ItemWhereInput } from './item-where.input';

@ArgsType()
export class UpdateManyItemArgs {
  @Field(() => ItemUpdateManyMutationInput, { nullable: false })
  @Type(() => ItemUpdateManyMutationInput)
  @ValidateNested()
  data!: ItemUpdateManyMutationInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;
}
