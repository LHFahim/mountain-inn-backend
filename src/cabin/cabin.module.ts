import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StorageService } from 'src/storage/storage.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CabinController } from './cabin.controller';
import { CabinService } from './cabin.service';
import { CabinEntity } from './entities/cabin.entity';

@Module({
  imports: [TypegooseModule.forFeature([CabinEntity, UserEntity])],
  controllers: [CabinController],
  providers: [CabinService, StorageService],
})
export class CabinModule {}
