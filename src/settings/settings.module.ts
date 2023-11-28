import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SettingEntity } from './entities/setting.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypegooseModule.forFeature([SettingEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
