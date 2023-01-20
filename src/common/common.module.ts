import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD, // same effect as set global, but used when the objects to be instanced have dependencies
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).exclude('coffee-rating').forRoutes(
      {
        path: 'coffees',
        method: RequestMethod.GET,
      },
      '*',
    ); //middleware is applied specified routes, is related to routes not method handler
    // you can scope this to path and by request method
    // exclude routes to apply this middleware
    // apply to all the routes using *
  }
}
