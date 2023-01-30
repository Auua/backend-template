import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int, { nullable: true })
  count!: number | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
