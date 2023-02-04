import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items';
import { PrismaMongoService, PrismaPgService } from './prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users';
import * as process from 'process';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { morganLogger } from '@/common/middleware/morgan.logger';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ItemsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaMongoService, PrismaPgService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morganLogger).exclude('/graphql').forRoutes('*');
  }
}
