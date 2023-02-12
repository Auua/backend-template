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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ItemsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ headers: req.headers, req, res }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaMongoService,
    PrismaPgService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morganLogger).exclude('/graphql').forRoutes('*');
  }
}
