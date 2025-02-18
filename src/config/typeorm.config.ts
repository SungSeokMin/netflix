import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envVariableKeys } from 'src/common/const/env.const';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { MovieDetail } from 'src/movie/entity/movie-detail.entity';
import { MovieUserLike } from 'src/movie/entity/movie-user-like.entity';
import { Movie } from 'src/movie/entity/movie.entity';
import { User } from 'src/user/entity/user.entity';

const entities = [User, Movie, MovieDetail, Director, Genre, MovieUserLike];

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    type: configService.get<string>(envVariableKeys.dbType) as 'postgres',
    host: configService.get<string>(envVariableKeys.dbHost),
    port: configService.get<number>(envVariableKeys.dbPort),
    username: configService.get<string>(envVariableKeys.dbUsername),
    password: configService.get<string>(envVariableKeys.dbPassword),
    database: configService.get<string>(envVariableKeys.dbDatabase),
    entities,
    synchronize: true,
  }),
  inject: [ConfigService],
};

export default typeOrmConfig;
