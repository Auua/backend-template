import {
  ArgumentsHost,
  Catch,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma as PGPrisma } from '@custom_prisma/pg';
import { Prisma as mongoPrisma } from '@custom_prisma/mongo';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(
  PGPrisma.PrismaClientKnownRequestError,
  mongoPrisma.PrismaClientKnownRequestError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger(
    PrismaClientExceptionFilter.name,
  );

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error({
      message: exception.message,
      context: PrismaClientExceptionFilter.name,
    });

    const meta = exception.meta;

    switch (exception.code) {
      case 'P2002': {
        const modifiedMessage = `Unique constraint failed on the fields: ${Object.values(
          meta,
        )}`;
        throw new ConflictException(modifiedMessage);
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        throw new InternalServerErrorException();
    }
  }
}
