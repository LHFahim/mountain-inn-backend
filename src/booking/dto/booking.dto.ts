import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BookingEntity } from '../entities/booking.entity';

export class CreateBookingDto extends PickType(BookingEntity, [
  'startDate',
  'endDate',
  'numberOfNights',
  'numberOfGuests',
  'extraPrice',
  'cabinPrice',
  'totalPrice',
  'cabin',
  'status',
  'hasBreakfast',
  'isPaid',
  'observation',
  'guest',
]) {}
export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

export class BookingDto extends BookingEntity {}

export class BookingQueryDto extends PaginationQueryDto {}
export class BookingPaginatedDto {
  @Expose()
  items: BookingDto[];

  @Expose()
  pagination: PaginationDto;
}
