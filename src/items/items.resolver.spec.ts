import { Test, TestingModule } from '@nestjs/testing';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';
import { PrismaMongoService } from '@/prisma';
import { ItemsController } from '@/items/items.controller';

describe('ItemsResolver', () => {
  let resolver: ItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsResolver, ItemsService, PrismaMongoService],
      controllers: [ItemsController],
    }).compile();

    resolver = module.get<ItemsResolver>(ItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
