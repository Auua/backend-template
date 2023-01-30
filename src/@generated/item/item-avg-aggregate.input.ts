import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  count?: true;
}
