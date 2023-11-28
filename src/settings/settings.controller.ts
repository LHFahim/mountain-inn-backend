import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import {
  CreateSettingDto,
  SettingQueryDto,
  UpdateSettingDto,
} from './dto/setting.dto';
import { SettingsService } from './settings.service';

@Serialize()
@ApiBearerAuth()
@ApiTags('Settings')
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Settings, version: APIVersions.V1 })
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post(Routes[ControllersEnum.Settings].create)
  create(@Body() body: CreateSettingDto) {
    return this.settingsService.create(body);
  }

  @Get(Routes[ControllersEnum.Settings].findAll)
  findAll(@Query() query: SettingQueryDto) {
    return this.settingsService.findAll(query);
  }

  @Get(Routes[ControllersEnum.Settings].findOne)
  findOne(@ResourceId() id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch(Routes[ControllersEnum.Settings].updateOne)
  updateOne(
    @ResourceId() id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.updateOne(id, updateSettingDto);
  }

  @Delete(Routes[ControllersEnum.Settings].deleteOne)
  deleteOne(@ResourceId() id: string) {
    return this.settingsService.deleteOne(id);
  }
}
