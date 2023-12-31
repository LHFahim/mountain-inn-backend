import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { UpdateUserDto } from 'src/user/dto/user.dto';
import { ProfileService } from './profile.service';

@Serialize()
@ApiBearerAuth()
@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Profile, version: APIVersions.V1 })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(Routes[ControllersEnum.Profile].myProfile)
  myProfile(@UserId() userId: string) {
    return this.profileService.myProfile(userId);
  }

  @Patch(Routes[ControllersEnum.Profile].updateProfile)
  updateProfile(@UserId() userId: string, @Body() body: UpdateUserDto) {
    return this.profileService.updateProfile(userId, body);
  }
}
