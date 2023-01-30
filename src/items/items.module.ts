import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { ItemsController } from './items.controller';
import { PrismaMongoService } from '@/prisma';

@Module({
  providers: [ItemsResolver, ItemsService, PrismaMongoService],
  controllers: [ItemsController],
})
export class ItemsModule {}
