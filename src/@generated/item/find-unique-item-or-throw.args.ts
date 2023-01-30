import { ArgsType, Field } from '@nestjs/graphql';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueItemOrThrowArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: ItemWhereUniqueInput;
}
