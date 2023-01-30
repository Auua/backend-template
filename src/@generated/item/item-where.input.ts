import { Field, HideField, InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class ItemWhereInput {
  @Field(() => [ItemWhereInput], { nullable: true })
  AND?: Array<ItemWhereInput>;

  @Field(() => [ItemWhereInput], { nullable: true })
  OR?: Array<ItemWhereInput>;

  @Field(() => [ItemWhereInput], { nullable: true })
  NOT?: Array<ItemWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter;

  @Field(() => IntNullableFilter, { nullable: true })
  count?: IntNullableFilter;

  @HideField()
  createdAt?: DateTimeFilter;

  @HideField()
  updatedAt?: DateTimeFilter;
}
