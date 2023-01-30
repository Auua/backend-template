import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaPgService } from '@/prisma';

@Module({
  providers: [UsersResolver, UsersService, PrismaPgService],
})
export class UsersModule {}
