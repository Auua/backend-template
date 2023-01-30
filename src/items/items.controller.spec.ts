import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsResolver } from '@/items/items.resolver';
import { ItemsService } from '@/items/items.service';
import { PrismaMongoService } from '@/prisma';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsResolver, ItemsService, PrismaMongoService],
      controllers: [ItemsController],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
