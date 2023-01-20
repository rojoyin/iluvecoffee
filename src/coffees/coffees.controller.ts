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
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { raw, Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';

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
  // @SetMetadata('isPublic', true) // this is a bare-bones way of doing this, not so good for code reuse
  @Public() // defined as a custom decorator, easily reusable
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    //@Body(ValidationPipe) applies validation to this specific parameter, only supported by pipes
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}
