import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;
}
