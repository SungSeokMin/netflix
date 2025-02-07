import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { MovieDetail } from 'src/movie/entity/movie-detail.entity';
import { Movie } from 'src/movie/entity/movie.entity';

const entities = [Movie, MovieDetail, Director, Genre];

const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    type: configService.get<string>('DB_TYPE') as 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities,
    synchronize: true,
  }),
  inject: [ConfigService],
};

export default typeOrmConfig;
