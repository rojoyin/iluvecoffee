import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffe.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CoffeesController], // API routes we want this module to instantiate
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS, // provide = token. What I will be replacing
      useValue: ['nestle'], // useValue, useClass or useFactory. What I will put instead of the provide attribute
      scope: Scope.REQUEST, // Scope.REQUEST provides a new instance per each request that reaches the server
      // Scope.TRANSIENT creates a new instance each time that a consumer adds an instance
    },
  ], // list of services that need to be instantiated by the nest injector. Any providers here will be available within THIS module itself, unless it is exported
  exports: [CoffeesService], // providers within THIS current module that will be available anywhere this module is imported
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule], // list of modules that THIS module requires, any exported providers of the imported modules will be available within this module
})
export class CoffeesModule {}
