import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { CabinEntity } from 'src/cabin/entities/cabin.entity';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { GuestEntity } from 'src/guest/entities/guest.entity';

export enum BookingStatus {
  UNCONFIRMED = 'UNCONFIRMED',
  NOT_ARRIVED = 'NOT_ARRIVED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
}

@Model('bookings', true)
export class BookingEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: false, type: Date })
  @ApiProperty({ required: true, type: Date })
  startDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: false, type: Date })
  @ApiProperty({ required: true, type: Date })
  endDate: Date;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  numberOfNights: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  numberOfGuests: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  cabinPrice: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  extraPrice: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  totalPrice: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  @ApiProperty({
    required: true,
    enum: BookingStatus,
    default: BookingStatus.UNCONFIRMED,
  })
  @Prop({ required: true, enum: BookingStatus })
  status: BookingStatus;

  @Expose()
  @IsMongoId()
  @Type(() => CabinEntity)
  @ApiProperty({ required: true, type: CabinEntity })
  @Prop({ required: false, ref: () => CabinEntity })
  cabin: string;

  @Expose()
  @IsMongoId()
  @Type(() => GuestEntity)
  @ApiProperty({ required: true, type: GuestEntity })
  @Prop({ required: false, ref: () => GuestEntity })
  guest: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  observation: string;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  hasBreakfast: boolean;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isPaid: boolean;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  isDeleted: boolean;
}
