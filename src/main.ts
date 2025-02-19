import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 정의하지 않은 필드가 들어왔을때 무시한다.
      forbidNonWhitelisted: true, // 정의되지 않은 필드가 들어왔을때 오류를 반환한다.
      transformOptions: {
        enableImplicitConversion: true, // typescript type을 기반으로 반환한다. (ex. Query Parameter)
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
