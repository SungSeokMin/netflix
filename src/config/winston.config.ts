import * as winston from 'winston';
import { join } from 'path';

const winstonConfig = {
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
};

export default winstonConfig;
