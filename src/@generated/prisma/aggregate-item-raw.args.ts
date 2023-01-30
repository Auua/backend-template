import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class AggregateItemRawArgs {
  @Field(() => [GraphQLJSON], { nullable: true })
  pipeline?: Array<any>;

  @Field(() => GraphQLJSON, { nullable: true })
  options?: any;
}
