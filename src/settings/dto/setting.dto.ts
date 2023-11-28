import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SettingEntity } from '../entities/setting.entity';

export class CreateSettingDto extends PickType(SettingEntity, [
  'minBookingLength',
  'maxBookingLength',
  'maxGuestsPerBooking',
  'breakfastPrice',
]) {}

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}

export class SettingDto extends SettingEntity {}

export class SettingQueryDto extends PaginationQueryDto {}
export class SettingPaginatedDto {
  @Expose()
  items: SettingDto[];

  @Expose()
  pagination: PaginationDto;
}
