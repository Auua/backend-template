import { Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '@/@generated/item/item.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Put('reduceQuantityOnce/:id')
  @HttpCode(HttpStatus.OK)
  reduceQuantity(@Param() params): Promise<Item> {
    return this.itemsService.updateItem({
      data: {
        count: {
          decrement: 1,
        },
      },
      where: {
        id: params.id,
      },
    });
  }
}
