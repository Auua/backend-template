import { Field, HideField, InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class ItemScalarWhereWithAggregatesInput {
  @Field(() => [ItemScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ItemScalarWhereWithAggregatesInput>;

  @Field(() => [ItemScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ItemScalarWhereWithAggregatesInput>;

  @Field(() => [ItemScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ItemScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  description?: StringNullableWithAggregatesFilter;

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  count?: IntNullableWithAggregatesFilter;

  @HideField()
  createdAt?: DateTimeWithAggregatesFilter;

  @HideField()
  updatedAt?: DateTimeWithAggregatesFilter;
}
