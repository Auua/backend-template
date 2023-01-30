import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemAvgAggregate {
  @Field(() => Float, { nullable: true })
  count?: number;
}
