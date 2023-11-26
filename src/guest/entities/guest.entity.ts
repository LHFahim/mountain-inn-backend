import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { UserProfileDto } from 'src/auth/dto/auth.dto';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { UserEntity } from 'src/user/entities/user.entity';

@Model('guests', true)
export class GuestEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  fullName: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, trim: true })
  @ApiProperty({ required: true, default: 'guest@gmail.com' })
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String, trim: true })
  phone: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  nationalId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  nationality: string;

  @Expose()
  @IsMongoId()
  @Type(() => UserProfileDto)
  @ApiProperty({ required: true, type: UserProfileDto })
  @Prop({ required: false, ref: () => UserEntity })
  createdBy: Ref<UserEntity>;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  isDeleted: boolean;
}
