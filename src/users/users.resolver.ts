import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { DeleteOneUserArgs } from '@/@generated/user/delete-one-user.args';
import { FindUniqueUserArgs } from '@/@generated/user/find-unique-user.args';
import { User } from '@/@generated/user/user.model';
import { CreateOneUserArgs } from '@/@generated/user/create-one-user.args';
import { UpdateOneUserArgs } from '@/@generated/user/update-one-user.args';
import { FindManyUserArgs } from '@/@generated/user/find-many-user.args';
import { FindFirstUserArgs } from '@/@generated/user/find-first-user.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args() createOneUserArgs: CreateOneUserArgs) {
    return this.usersService.createUser(createOneUserArgs);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args() findManyUserArgs: FindManyUserArgs) {
    return this.usersService.users(findManyUserArgs);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args() findFirstUserArgs: FindFirstUserArgs) {
    return this.usersService.user(findFirstUserArgs);
  }

  @Query(() => User, { name: 'uniqueUser' })
  findUniqueOne(@Args() findUniqueUserArgs: FindUniqueUserArgs) {
    return this.usersService.uniqueUser(findUniqueUserArgs);
  }

  @Mutation(() => User)
  updateUser(@Args() updateOneUserArgs: UpdateOneUserArgs) {
    return this.usersService.updateUser(updateOneUserArgs);
  }

  @Mutation(() => User)
  removeUser(@Args() deleteOneUserArgs: DeleteOneUserArgs) {
    return this.usersService.deleteUser(deleteOneUserArgs);
  }
}
