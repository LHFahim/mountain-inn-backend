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
import { CabinService } from './cabin.service';
import { CreateCabinDto, UpdateCabinDto } from './dto/cabin.dto';

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

  @Get()
  findAll() {
    return this.cabinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cabinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCabinDto: UpdateCabinDto) {
    return this.cabinService.update(+id, updateCabinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabinService.remove(+id);
  }
}
