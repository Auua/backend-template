import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  count?: true;
}
