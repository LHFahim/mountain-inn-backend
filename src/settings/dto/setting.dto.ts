import { PartialType, PickType } from '@nestjs/swagger';
import { SettingEntity } from '../entities/setting.entity';

export class CreateSettingDto extends PickType(SettingEntity, [
  'minBookingLength',
  'maxBookingLength',
  'maxGuestsPerBooking',
  'breakfastPrice',
]) {}

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}

export class SettingDto extends SettingEntity {}
