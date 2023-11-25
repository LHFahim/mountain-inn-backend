import { PartialType } from '@nestjs/swagger';

import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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

export class CabinQueryDto extends PaginationQueryDto {}
export class CabinPaginatedDto {
  @Expose()
  items: CabinDto[];

  @Expose()
  pagination: PaginationDto;
}
