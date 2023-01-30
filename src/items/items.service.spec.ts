import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemsResolver } from '@/items/items.resolver';
import { PrismaMongoService } from '@/prisma';
import { ItemsController } from '@/items/items.controller';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsResolver, ItemsService, PrismaMongoService],
      controllers: [ItemsController],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
