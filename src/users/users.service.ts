import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaPgService } from '@/prisma';
import { DeleteOneUserArgs } from '@/@generated/user/delete-one-user.args';
import { FindUniqueUserArgs } from '@/@generated/user/find-unique-user.args';
import { User } from '@/@generated/user/user.model';
import { CreateOneUserArgs } from '@/@generated/user/create-one-user.args';
import { UpdateOneUserArgs } from '@/@generated/user/update-one-user.args';
import { FindManyUserArgs } from '@/@generated/user/find-many-user.args';
import { FindFirstUserArgs } from '@/@generated/user/find-first-user.args';
import * as bcrypt from 'bcrypt';
import { UpdateManyUserArgs } from '@/@generated/user/update-many-user.args';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

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
    createOneUserArgs.data.password = await this.hashPassword(
      createOneUserArgs.data.password,
    );
    return await this.prisma.user.create(createOneUserArgs);
  }

  async updateUser(updateOneUserArgs: UpdateOneUserArgs): Promise<User> {
    if (updateOneUserArgs.data.password) {
      updateOneUserArgs.data.password.set = await this.hashPassword(
        updateOneUserArgs.data.password.set,
      );
    }

    return await this.prisma.user.update(updateOneUserArgs);
  }

  async updateManyUser(
    updateManyUserArgs: UpdateManyUserArgs,
  ): Promise<boolean> {
    const { count } = await this.prisma.user.updateMany(updateManyUserArgs);
    this.logger.log(`${count} users were updated`);
    return true;
  }

  async deleteUser(deleteOneUserArgs: DeleteOneUserArgs): Promise<User> {
    return await this.prisma.user.delete(deleteOneUserArgs);
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
