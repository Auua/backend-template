import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma as PGPrisma } from '@custom_prisma/pg';
import { Prisma as mongoPrisma } from '@custom_prisma/mongo';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { Request } from 'express';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql/type';

@Catch(
  PGPrisma.PrismaClientValidationError,
  mongoPrisma.PrismaClientValidationError,
)
export class PrismaValidationExceptionFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger(
    PrismaValidationExceptionFilter.name,
  );

  catch(exception: PrismaClientValidationError, host: ArgumentsHost) {
    this.logger.error({
      message: exception.message,
      context: PrismaValidationExceptionFilter.name,
    });

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    let args = undefined;

    if (request) {
      args = {
        query: request.query,
      };
    } else {
      args = {
        query: info.variableValues,
      };
    }

    throw new BadRequestException(
      `validation failed on ${JSON.stringify(args)}`,
    );
  }
}
