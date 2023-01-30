import { Field, HideField, InputType } from '@nestjs/graphql';

@InputType()
export class ItemMinAggregateInput {
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
}
