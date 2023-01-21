import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { COFFEE_BRANDS } from './coffe.constants';
import { ConfigService, getConfigToken } from '@nestjs/config';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    // setup phase runs before each test case
    const module: TestingModule = await Test.createTestingModule({
      //Test class mocks the full nest runtime
      //createTestingModule receives module metadata that we pass to the module decorators
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: COFFEE_BRANDS, useValue: {} },
        { provide: ConfigService, useValue: { get: (a) => a } }, //add a get method to solve issue of getting configuration entries
        { provide: getConfigToken('coffees'), useValue: {} },
      ],
    }).compile(); //compile method bootstraps module with its dependencies, similar to bootstrap() method call in the main file

    // service = module.get<CoffeesService>(CoffeesService); //you can get any static instance declared within the module
    service = await module.resolve(CoffeesService); //<----- to get request scope or transient scope providers use this
  });

  it('should be defined', () => {
    //it function defines an individual test
    expect(service).toBeDefined();
  });
});
