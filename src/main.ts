import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { dailyLogger } from '@/common/middleware/winston.logger';
import { ExceptionsFilter } from '@/common/filters/exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from '@/common/filters/prisma.client.exception.filter';
import { PrismaValidationExceptionFilter } from '@/common/filters/prisma.validation.exception.filter';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { corsOptions } from '@/config/cors.options';
import helmet from 'helmet';

//import { CustomValidationPipe } from '@/common/middleware/validation.pipeline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(dailyLogger),
  });
  const configService = app.get(ConfigService);

  // Middleware
  app.use(helmet());
  app.use(helmet.xssFilter());
  app.use(cookieParser(configService.get<string>('cookie')));
  app.use(cors(corsOptions));

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Global Filters
  app.useGlobalFilters(
    new ExceptionsFilter(),
    new PrismaClientExceptionFilter(httpAdapter),
    new PrismaValidationExceptionFilter(httpAdapter),
  );
  await app.listen(configService.get<number>('port'));
}

bootstrap();
