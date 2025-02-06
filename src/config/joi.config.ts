import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    ENV: Joi.string().valid('prod', 'dev').required(),
    DB_TYPE: Joi.string().valid('postgres').required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
  }),
};

export default envConfig;
