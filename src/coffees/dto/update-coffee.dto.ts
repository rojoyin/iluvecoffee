import { CreateCoffeeDto } from './create-coffee.dto';
import { PartialType } from '@nestjs/swagger'; // this fixes the missing properties in the schemes listed by swagger

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
// PartialType from @nest/mapped-types library makes all the fields from the
// class passed as parameter optional, and inherits the validation rules
