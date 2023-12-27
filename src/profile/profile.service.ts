import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { UserProfileDto } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService extends SerializeService<UserEntity> {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
  ) {
    super(UserEntity);
  }

  async myProfile(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });

    return this.toJSON(user, UserProfileDto);
  }

  async updateProfile(userId: string, body: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { ...body },
      { new: true },
    );

    return this.toJSON(user, UserProfileDto);
  }
}
