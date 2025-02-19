import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 } from 'uuid';
import { TasksService } from './task.service';
import { DefaultLogger } from './logger/default.logger';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'public', 'temp'),
        filename: (req, file, callback) => {
          const split = file.originalname.split('.');

          let extension = 'mp4';

          if (split.length > 1) {
            extension = split.at(-1);
          }

          const filename = `${v4()}_${Date.now()}.${extension}`;

          callback(null, filename);
        },
      }),
    }),
  ],
  providers: [CommonService, TasksService, DefaultLogger],
  controllers: [CommonController],
  exports: [CommonService, DefaultLogger],
})
export class CommonModule {}
