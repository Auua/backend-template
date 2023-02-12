import { Field, HideField, InputType } from '@nestjs/graphql';

@InputType()
export class UserMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  email?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  password?: true;

  @Field(() => Boolean, { nullable: true })
  refreshToken?: true;

  @HideField()
  createdAt?: true;

  @HideField()
  updatedAt?: true;
}
