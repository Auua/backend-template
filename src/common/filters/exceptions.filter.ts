import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql/type';

@Catch()
export class ExceptionsFilter
  extends BaseExceptionFilter
  implements GqlExceptionFilter
{
  private readonly logger: Logger = new Logger(ExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    this.logger.error(exception, exception.stack, ExceptionsFilter.name);

    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const customErrorResponse = {
      status: status,
      timestamp: new Date().toLocaleDateString(),
      error: exception.error,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message || null
          : 'Internal server error',
    };

    const errorResponse = exception.getResponse()
      ? exception.getResponse()
      : customErrorResponse;

    // This is for REST petitions
    if (request) {
      const error = {
        ...errorResponse,
        path: request.url,
        method: request.method,
      };

      this.logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(error),
      );

      response.status(status).json(error);
    } else {
      // This is for GRAPHQL petitions
      const error = {
        ...errorResponse,
        type: info.parentType,
        field: info.fieldName,
        query: info.variableValues,
      };

      this.logger.error(
        `${info.parentType} ${info.fieldName} ${JSON.stringify(
          info.variableValues,
        )}`,
        JSON.stringify(error),
      );

      return exception;
    }
  }

  /*
  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    if (host.getType<GqlContextType>() === 'graphql') {
      console.log('grapfh');
      const gqlHost = GqlArgumentsHost.create(host);
      const {
        req: {
          body: { operationName, variables },
        },
      } = gqlHost.getContext();
      args = `${operationName} ${JSON.stringify(variables)}`;
    } else {
      super.catch(exception, host);
      console.log('aodjosajjfklaklsflalfnakelfnal');
      // const req = host.switchToHttp().getRequest<Request>();
      // req.method, req.originalUrl...
      // args = req.body;
    }

    const status = this.getHttpStatus(exception);

    console.log('excpetionssss' + exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error(`${exception.message}: ${args}`, exception.stack);
      } else {
        // Error Notifications
        this.logger.error('UnhandledException', exception);
      }
    }
  }

  private getHttpStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

   */
}
