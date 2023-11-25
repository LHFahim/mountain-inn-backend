import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

export enum BookingStatus {
  UNCONFIRMED = 'UNCONFIRMED',
  NOT_ARRIVED = 'NOT_ARRIVED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
}
