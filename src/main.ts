import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('iluvecofee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build(); // builds a document following openapi specs

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
