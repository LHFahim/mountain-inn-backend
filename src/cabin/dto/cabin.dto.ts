import { PartialType } from '@nestjs/swagger';

import { PickType } from '@nestjs/swagger';
import { CabinEntity } from '../entities/cabin.entity';

export class CreateCabinDto extends PickType(CabinEntity, [
  'name',
  'title',
  'description',
  'discount',
  'image',
  'maxCapacity',
  'regularPrice',
]) {}

export class UpdateCabinDto extends PartialType(CreateCabinDto) {}

export class CabinDto extends CabinEntity {}
