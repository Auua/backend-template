import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindItemRawArgs {
  @Field(() => GraphQLJSON, { nullable: true })
  filter?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  options?: any;
}
