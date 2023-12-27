import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { UserProfileDto } from 'src/auth/dto/auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService extends SerializeService<UserEntity> {
  constructor(
    @InjectModel(UserEntity)
    private readonly cabinModel: ReturnModelType<typeof UserEntity>,
  ) {
    super(UserEntity);
  }

  async myProfile(userId: string) {
    const user = await this.cabinModel.findOne({ _id: userId });

    return this.toJSON(user, UserProfileDto);
  }
}
