import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BookingEntity, BookingStatus } from '../entities/booking.entity';

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

export class BookingQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  @ApiProperty({
    required: false,
    enum: BookingStatus,
    default: BookingStatus.UNCONFIRMED,
  })
  status: BookingStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  startDate: string;
}
export class BookingPaginatedDto {
  @Expose()
  items: BookingDto[];

  @Expose()
  pagination: PaginationDto;
}
