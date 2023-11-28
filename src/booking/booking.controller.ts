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
import { BookingService } from './booking.service';
import {
  BookingQueryDto,
  CreateBookingDto,
  UpdateBookingDto,
} from './dto/booking.dto';

@ApiTags('Bookings')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Bookings, version: APIVersions.V1 })
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(Routes[ControllersEnum.Bookings].create)
  create(@Body() body: CreateBookingDto) {
    return this.bookingService.create(body);
  }

  @Get(Routes[ControllersEnum.Bookings].findAll)
  findAll(@Query() query: BookingQueryDto) {
    return this.bookingService.findAll(query);
  }

  @Get(Routes[ControllersEnum.Bookings].findOne)
  findOne(@ResourceId() id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(Routes[ControllersEnum.Bookings].updateOne)
  updateOne(
    @ResourceId() id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateOne(id, updateBookingDto);
  }

  @Delete(Routes[ControllersEnum.Bookings].deleteOne)
  deleteOne(@ResourceId() id: string) {
    return this.bookingService.deleteOne(id);
  }
}
