import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

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

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id: ${id} doesn't exists`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    return this.coffees.push(createCoffeeDto);
  }

  update(id: number, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
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
