import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import typeOrmConfig from './config/typeorm.config';
import envConfig from './config/env.config';
import { BearerTokenMiddleware } from './auth/middleware/bearer-token.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import serveStaticConfig from './config/serve-static.config';
import providersConfig from './config/provider.config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ServeStaticModule.forRoot(serveStaticConfig),
    CacheModule.register({ ttl: 3000, isGlobal: true }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp(),
            winston.format.printf(
              (info) =>
                `${new Date(info.timestamp as string).toLocaleString()} [${info.context}] ${info.level} ${info.message}`,
            ),
          ),
        }),
        new winston.transports.File({
          dirname: join(process.cwd(), 'logs'),
          filename: 'logs.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) =>
                `${new Date(info.timestamp as string).toLocaleString()} [${info.context}] ${info.level} ${info.message}`,
            ),
          ),
        }),
      ],
    }),
    MovieModule,
    DirectorModule,
    GenreModule,
    UserModule,
    AuthModule,
  ],
  providers: providersConfig,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/register',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
