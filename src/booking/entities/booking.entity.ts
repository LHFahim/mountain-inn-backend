import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
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
import { BookingStatus } from '../dto/update-booking.dto';

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
  cabin: Ref<CabinEntity>;

  @Expose()
  @IsMongoId()
  @Type(() => GuestEntity)
  @ApiProperty({ required: true, type: GuestEntity })
  @Prop({ required: false, ref: () => GuestEntity })
  guest: Ref<GuestEntity>;

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
