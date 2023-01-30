import { registerEnumType } from '@nestjs/graphql';

export enum ItemScalarFieldEnum {
  id = 'id',
  name = 'name',
  description = 'description',
  count = 'count',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(ItemScalarFieldEnum, {
  name: 'ItemScalarFieldEnum',
  description: undefined,
});
