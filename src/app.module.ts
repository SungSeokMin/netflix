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
import providers from './config/provider.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    MovieModule,
    DirectorModule,
    GenreModule,
    UserModule,
    AuthModule,
  ],
  providers,
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
