import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Item } from '@custom_prisma/mongo';
import { PrismaMongoService } from '@/prisma';
import { FindManyItemArgs } from '@/@generated/item/find-many-item.args';
import { UpdateOneItemArgs } from '@/@generated/item/update-one-item.args';
import { CreateOneItemArgs } from '@/@generated/item/create-one-item.args';
import { DeleteOneItemArgs } from '@/@generated/item/delete-one-item.args';
import { FindUniqueItemArgs } from '@/@generated/item/find-unique-item.args';
import { ItemAggregateArgs } from '@/@generated/item/item-aggregate.args';
import { UpdateManyItemArgs } from '@/@generated/item/update-many-item.args';

@Injectable()
export class ItemsService {
  private readonly logger: Logger = new Logger(ItemsService.name);

  constructor(private prisma: PrismaMongoService) {}

  async item(findUniqueItemArgs: FindUniqueItemArgs): Promise<Item | null> {
    const item = await this.prisma.item.findUnique(findUniqueItemArgs);
    if (item) return item;
    throw new NotFoundException();
  }

  async items(findManyItemArgs: FindManyItemArgs): Promise<Item[]> {
    return await this.prisma.item.findMany(findManyItemArgs);
  }

  async createItem(createOneItemArgs: CreateOneItemArgs): Promise<Item> {
    return await this.prisma.item.create(createOneItemArgs);
  }

  async updateItem(updateOneItemArgs: UpdateOneItemArgs): Promise<Item> {
    return await this.prisma.item.update(updateOneItemArgs);
  }

  async updateManyItem(
    updateManyItemArgs: UpdateManyItemArgs,
  ): Promise<boolean> {
    const { count } = await this.prisma.item.updateMany(updateManyItemArgs);
    this.logger.log(`${count} items were updated`);
    return true;
  }

  async deleteItem(deleteOneItemArgs: DeleteOneItemArgs): Promise<Item> {
    return await this.prisma.item.delete(deleteOneItemArgs);
  }

  async count(itemAggregateArgs: ItemAggregateArgs): Promise<any | null> {
    return await this.prisma.item.aggregate(itemAggregateArgs);
  }
}
