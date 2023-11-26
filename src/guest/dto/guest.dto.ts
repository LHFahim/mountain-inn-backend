import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GuestEntity } from '../entities/guest.entity';

export class CreateGuestDto extends PickType(GuestEntity, [
  'fullName',
  'email',
  'phone',
  'nationality',
  'nationalId',
]) {}

export class UpdateGuestDto extends PartialType(CreateGuestDto) {}

export class GuestDto extends GuestEntity {}

export class GuestQueryDto extends PaginationQueryDto {}
export class GuestPaginatedDto {
  @Expose()
  items: GuestDto[];

  @Expose()
  pagination: PaginationDto;
}
