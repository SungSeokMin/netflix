import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

const serveStaticConfig: ServeStaticModuleOptions = {
  rootPath: join(process.cwd(), 'public'),
  serveRoot: '/public/',
};

export default serveStaticConfig;
