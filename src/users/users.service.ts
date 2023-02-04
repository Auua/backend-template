import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPgService } from '@/prisma';
import { DeleteOneUserArgs } from '@/@generated/user/delete-one-user.args';
import { FindUniqueUserArgs } from '@/@generated/user/find-unique-user.args';
import { User } from '@/@generated/user/user.model';
import { CreateOneUserArgs } from '@/@generated/user/create-one-user.args';
import { UpdateOneUserArgs } from '@/@generated/user/update-one-user.args';
import { FindManyUserArgs } from '@/@generated/user/find-many-user.args';
import { FindFirstUserArgs } from '@/@generated/user/find-first-user.args';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaPgService) {}

  async user(findFirstUserArgs: FindFirstUserArgs): Promise<User> {
    const user = await this.prisma.user.findFirst(findFirstUserArgs);
    if (user) return user;
    throw new NotFoundException();
  }

  async uniqueUser(findUniqueUserArgs: FindUniqueUserArgs): Promise<User> {
    const user = await this.prisma.user.findUnique(findUniqueUserArgs);
    if (user) return user;
    throw new NotFoundException();
  }

  async users(findManyUserArgs: FindManyUserArgs): Promise<User[]> {
    return await this.prisma.user.findMany(findManyUserArgs);
  }

  async createUser(createOneUserArgs: CreateOneUserArgs): Promise<User> {
    return await this.prisma.user.create(createOneUserArgs);
  }

  async updateUser(updateOneUserArgs: UpdateOneUserArgs): Promise<User> {
    return await this.prisma.user.update(updateOneUserArgs);
  }

  async deleteUser(deleteOneUserArgs: DeleteOneUserArgs): Promise<User> {
    return await this.prisma.user.delete(deleteOneUserArgs);
  }
}
