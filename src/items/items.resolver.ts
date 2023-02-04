import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from '@/@generated/item/item.model';
import { FindManyItemArgs } from '@/@generated/item/find-many-item.args';
import { UpdateOneItemArgs } from '@/@generated/item/update-one-item.args';
import { CreateOneItemArgs } from '@/@generated/item/create-one-item.args';
import { DeleteOneItemArgs } from '@/@generated/item/delete-one-item.args';
import { FindUniqueItemArgs } from '@/@generated/item/find-unique-item.args';
import { ItemAggregateArgs } from '@/@generated/item/item-aggregate.args';
import { AggregateItem } from '@/@generated/item/aggregate-item.output';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args() createOneItemArgs: CreateOneItemArgs) {
    return this.itemsService.createItem(createOneItemArgs);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(@Args() findManyItemArgs: FindManyItemArgs) {
    return this.itemsService.items(findManyItemArgs);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args() findUniqueItemArgs: FindUniqueItemArgs) {
    return this.itemsService.item(findUniqueItemArgs);
  }

  @Mutation(() => Item)
  updateItem(@Args() updateOneItemArgs: UpdateOneItemArgs) {
    return this.itemsService.updateItem(updateOneItemArgs);
  }

  @Mutation(() => Item)
  removeItem(@Args() deleteOneItemArgs: DeleteOneItemArgs) {
    return this.itemsService.deleteItem(deleteOneItemArgs);
  }

  @Query(() => AggregateItem, { name: 'count' })
  getCount(@Args() itemAggregateArgs: ItemAggregateArgs) {
    return this.itemsService.count(itemAggregateArgs);
  }
}
