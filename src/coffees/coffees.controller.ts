import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

// @UsePipes(ValidationPipe) // using ValidationPipe class scope: controller
@UsePipes(new ValidationPipe()) // using ValidationPipe instance, useful for custom configuration,
// but it requires more memory as a new instance will be created each time it is used scope: controller
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeeService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request, // using request scope providers may impact the application performance, as each request will instantiate the service // however, it provides more metadata about each request that arrives to the server
  ) {
    console.log('CoffeesController created');
    // this shows that whenever a service this controller depends on, and it is request scoped, the controller also becomes request scoped
  }

  @UsePipes(ValidationPipe) // scope: method (route handler)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}
