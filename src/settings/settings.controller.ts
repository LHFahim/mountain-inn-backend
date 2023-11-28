import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';
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
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(Routes[ControllersEnum.Settings].findOne)
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Patch(Routes[ControllersEnum.Settings].updateOne)
  updateOne(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.updateOne(+id, updateSettingDto);
  }

  @Delete(Routes[ControllersEnum.Settings].deleteOne)
  deleteOne(@Param('id') id: string) {
    return this.settingsService.deleteOne(+id);
  }
}
