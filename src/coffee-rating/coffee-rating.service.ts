import { Injectable, Scope } from '@nestjs/common';
import { CoffeesService } from '../coffees/coffees.service';

@Injectable({ scope: Scope.DEFAULT }) // scope controls how the instances of this service will be created
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeesService) {}
}
