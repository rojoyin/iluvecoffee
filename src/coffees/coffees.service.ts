import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      brand: 'Shipwreck Roast',
      name: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeeDto: any) {
    return this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(updateCoffeeDto.id);
    if (existingCoffee) {
      // update the existing entry
    }
  }

  remove(id: string) {
    const existingCoffeeIndex = this.coffees.findIndex(
      (item) => item.id === +id,
    );
    if (existingCoffeeIndex >= 0) {
      this.coffees.splice(existingCoffeeIndex, 1);
    }
  }
}
