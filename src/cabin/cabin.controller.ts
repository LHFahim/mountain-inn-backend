import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
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

  @Post(Routes[ControllersEnum.Cabins].create)
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

  @Post(Routes[ControllersEnum.Cabins].uploadImage)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {}))
  uploadImage(
    @UserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cabinService.uploadImage(userId, file);
  }
}
