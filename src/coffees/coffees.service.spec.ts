import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { COFFEE_BRANDS } from './coffe.constants';
import { ConfigService, getConfigToken } from '@nestjs/config';

type MockitoRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <T = any>(): MockitoRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
}); // this function will create a repository of generic type when needed

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockitoRepository;

  beforeEach(async () => {
    // setup phase runs before each test case
    const module: TestingModule = await Test.createTestingModule({
      //Test class mocks the full nest runtime
      //createTestingModule receives module metadata that we pass to the module decorators
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        { provide: COFFEE_BRANDS, useValue: {} },
        { provide: ConfigService, useValue: { get: (a) => a } }, //add a get method to solve issue of getting configuration entries
        { provide: getConfigToken('coffees'), useValue: {} },
      ],
    }).compile(); //compile method bootstraps module with its dependencies, similar to bootstrap() method call in the main file

    // service = module.get<CoffeesService>(CoffeesService); //you can get any static instance declared within the module
    service = await module.resolve(CoffeesService); //<----- to get request scope or transient scope providers use this
    coffeeRepository = module.get<MockitoRepository>(
      getRepositoryToken(Coffee),
    );
  });

  it('should be defined', () => {
    //it function defines an individual test
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    // we have to cover two paths: coffee with id exists, or coffee doesn't exist
    // first nested describe covers exists path
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeID = 1;
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const foundCoffee = await service.findOne(coffeeID);
        expect(foundCoffee).toEqual(expectedCoffee);
      });
    });
  });
});
