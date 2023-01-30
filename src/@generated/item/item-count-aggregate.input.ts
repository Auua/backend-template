import { Field, HideField, InputType } from '@nestjs/graphql';

@InputType()
export class ItemCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  count?: true;

  @HideField()
  createdAt?: true;

  @HideField()
  updatedAt?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
