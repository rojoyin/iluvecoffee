import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController], // API routes we want this module to instantiate
  providers: [CoffeesService], // list of services that need to be instantiated by the nest injector. Any providers here will be available within THIS module itself, unless it is exported
  exports: [CoffeesService], // providers within THIS current module that will be available anywhere this module is imported
  imports: [], // list of modules that THIS module requires, any exported providers of the imported modules will be available within this module
})
export class CoffeesModule {}
