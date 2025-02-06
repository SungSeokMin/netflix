import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 정의하지 않은 필드가 들어왔을때 무시한다.
      forbidNonWhitelisted: true, // 정의되지 않은 필드가 들어왔을때 오류를 반환한다.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
