import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

export enum CabinStatusEnum {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

@Model('cabins', true)
export class CabinEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  description: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  maxCapacity: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  regularPrice: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Prop({ required: true })
  @ApiProperty({ required: true })
  discount: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(CabinStatusEnum)
  @ApiProperty({
    required: true,
    enum: CabinStatusEnum,
    default: CabinStatusEnum.AVAILABLE,
  })
  @Prop({ required: true, enum: CabinStatusEnum })
  status: CabinStatusEnum;

  @Expose()
  @IsString()
  @IsOptional()
  @Prop({ required: false, default: '' })
  image: string;

  @Expose()
  @IsOptional()
  @IsArray({ each: true })
  @Prop({ required: false, default: [] })
  @ApiProperty({ required: false, default: [] })
  images: string[];

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  isDeleted: boolean;
}
