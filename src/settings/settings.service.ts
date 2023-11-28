import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateSettingDto,
  SettingDto,
  SettingQueryDto,
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

  async findAll(query: SettingQueryDto) {
    const settings = await this.settingModel
      .find({ isDeleted: false, isActive: true })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const settingsCount = await this.settingModel
      .countDocuments({ isDeleted: false, isActive: true })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    return {
      items: this.toJSONs(settings, SettingDto),
      pagination: {
        total: settingsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          settingsCount > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(_id: string) {
    const setting = await this.settingModel.findOne({
      _id,
      isDeleted: false,
      isActive: true,
    });
    if (!setting) throw new NotFoundException('Setting is not found');

    return this.toJSON(setting, SettingDto);
  }

  async updateOne(_id: string, body: UpdateSettingDto) {
    const setting = await this.settingModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { ...body },
      { new: true },
    );
    if (!setting) throw new NotFoundException('Setting is not found');

    return this.toJSON(setting, SettingDto);
  }

  async deleteOne(_id: string) {
    const setting = await this.settingModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { isDeleted: true, isActive: false },
      { new: true },
    );
    if (!setting) throw new NotFoundException('Setting is not found');

    return this.toJSON(setting, SettingDto);
  }
}
