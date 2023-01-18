import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // checks if parameters within a json contain unexpected attributes
      transform: true, // transform received objects to DTO objects,
      // and also converts path and query params to what is cast to
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // this will convert the received parameter to the right types declared with TypeScript
      },
    }),
  );
  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
