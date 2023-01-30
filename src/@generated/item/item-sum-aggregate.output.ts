import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemSumAggregate {
  @Field(() => Int, { nullable: true })
  count?: number;
}
