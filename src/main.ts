import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { dailyLogger } from '@/common/middleware/winston.logger';
import { ExceptionsFilter } from '@/common/filters/exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from '@/common/filters/prisma.client.exception.filter';
import { PrismaValidationExceptionFilter } from '@/common/filters/prisma.validation.exception.filter';

//import { CustomValidationPipe } from '@/common/middleware/validation.pipeline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(dailyLogger),
  });
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new ExceptionsFilter(),
    new PrismaClientExceptionFilter(httpAdapter),
    new PrismaValidationExceptionFilter(httpAdapter),
  );
  await app.listen(3000);
}

bootstrap();
