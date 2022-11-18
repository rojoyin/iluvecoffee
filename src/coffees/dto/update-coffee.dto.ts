import { CreateCoffeeDto } from './create-coffee.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
// PartialType from @nest/mapped-types library makes all the fields from the
// class passed as parameter optional, and inherits the validation rules
