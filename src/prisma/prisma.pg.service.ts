import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@custom_prisma/pg';

@Injectable()
export class PrismaPgService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaPgService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('error', (event) => {
      this.logger.error(`${event.message}`, null, PrismaPgService.name);
    });
    this.$on('warn', (event) => {
      this.logger.warn(`${event.message}`);
    });
    this.$on('info', (event) => {
      this.logger.verbose(`${event.message}`);
    });
    this.$on('query', (event) => {
      this.logger.log(`${event.query} ${event.params} - ${event.duration} ms`);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async (event) => {
      this.logger.log(event.name);
      await app.close();
    });
  }
}
