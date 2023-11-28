import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateSettingDto,
  SettingDto,
  UpdateSettingDto,
} from './dto/setting.dto';
import { SettingEntity } from './entities/setting.entity';

@Injectable()
export class SettingsService extends SerializeService<SettingEntity> {
  constructor(
    @InjectModel(SettingEntity)
    private readonly settingModel: ReturnModelType<typeof SettingEntity>,
  ) {
    super(SettingEntity);
  }

  async create(body: CreateSettingDto) {
    const setting = await this.settingModel.create({ ...body });

    return this.toJSON(setting, SettingDto);
  }

  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  updateOne(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  deleteOne(id: number) {
    return `This action removes a #${id} setting`;
  }
}
