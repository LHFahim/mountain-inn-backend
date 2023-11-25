import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { UserProfileDto } from 'src/auth/dto/auth.dto';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { UserEntity } from 'src/user/entities/user.entity';

@Model('settings', true)
export class settingEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  minBookingLength: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  maxBookingLength: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  maxGuestsPerBooking: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  breakfastPrice: number;

  @Expose()
  @IsMongoId()
  @IsOptional()
  @Type(() => UserProfileDto)
  @ApiProperty({ required: false, type: UserProfileDto })
  @Prop({ required: false, ref: () => UserEntity, default: null })
  createdBy: Ref<UserEntity> | null;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  isDeleted: boolean;
}
