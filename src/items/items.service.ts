import { Injectable } from '@nestjs/common';
import { Item } from '@custom_prisma/mongo';
import { PrismaMongoService } from '@/prisma';
import { FindManyItemArgs } from '@/@generated/item/find-many-item.args';
import { UpdateOneItemArgs } from '@/@generated/item/update-one-item.args';
import { CreateOneItemArgs } from '@/@generated/item/create-one-item.args';
import { DeleteOneItemArgs } from '@/@generated/item/delete-one-item.args';
import { FindUniqueItemArgs } from '@/@generated/item/find-unique-item.args';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaMongoService) {}

  async item(findUniqueItemArgs: FindUniqueItemArgs): Promise<Item | null> {
    return this.prisma.item.findUnique(findUniqueItemArgs);
  }

  async items(findManyItemArgs: FindManyItemArgs): Promise<Item[]> {
    return this.prisma.item.findMany(findManyItemArgs);
  }

  async createItem(createOneItemArgs: CreateOneItemArgs): Promise<Item> {
    return this.prisma.item.create(createOneItemArgs);
  }

  async updateItem(updateOneItemArgs: UpdateOneItemArgs): Promise<Item> {
    return this.prisma.item.update(updateOneItemArgs);
  }

  async deleteItem(deleteOneItemArgs: DeleteOneItemArgs): Promise<Item> {
    return this.prisma.item.delete(deleteOneItemArgs);
  }
}
