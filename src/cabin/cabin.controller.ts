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
import { CabinService } from './cabin.service';
import { CabinQueryDto, CreateCabinDto, UpdateCabinDto } from './dto/cabin.dto';

@Serialize()
@ApiBearerAuth()
@ApiTags('Cabins')
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Cabins, version: APIVersions.V1 })
export class CabinController {
  constructor(private readonly cabinService: CabinService) {}

  @Post(Routes[ControllersEnum.Cabins].Create)
  create(@Body() body: CreateCabinDto) {
    return this.cabinService.create(body);
  }

  @Get(Routes[ControllersEnum.Cabins].findAll)
  findAll(@Query() query: CabinQueryDto) {
    return this.cabinService.findAll(query);
  }

  @Get(Routes[ControllersEnum.Cabins].findOne)
  findOne(@ResourceId() id: string) {
    return this.cabinService.findOne(id);
  }

  @Patch(Routes[ControllersEnum.Cabins].updateOne)
  updateOne(@ResourceId() id: string, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinService.updateOne(id, updateCabinDto);
  }

  @Delete(Routes[ControllersEnum.Cabins].deleteOne)
  deleteOne(@ResourceId() id: string) {
    return this.cabinService.deleteOne(id);
  }
}
