import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // checks if parameters within a json contain unexpected attributes
      transform: true, // transform received objects to DTO objects,
      // and also converts path and query params to what is cast to
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
