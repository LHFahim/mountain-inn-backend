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
import { CreateGuestDto, GuestQueryDto, UpdateGuestDto } from './dto/guest.dto';
import { GuestService } from './guest.service';

@Serialize()
@ApiBearerAuth()
@ApiTags('Guests')
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Guests, version: APIVersions.V1 })
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post(Routes[ControllersEnum.Guests].create)
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @Get(Routes[ControllersEnum.Guests].findAll)
  findAll(@Query() query: GuestQueryDto) {
    return this.guestService.findAll(query);
  }

  @Get(Routes[ControllersEnum.Guests].findOne)
  findOne(@ResourceId() id: string) {
    return this.guestService.findOne(id);
  }

  @Patch(Routes[ControllersEnum.Guests].updateOne)
  updateOne(@ResourceId() id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.updateOne(id, updateGuestDto);
  }

  @Delete(Routes[ControllersEnum.Guests].deleteOne)
  deleteOne(@ResourceId() id: string) {
    return this.guestService.deleteOne(id);
  }
}
