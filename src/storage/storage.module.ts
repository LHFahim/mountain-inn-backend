import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from 'src/user/entities/user.entity';
import { StorageService } from './storage.service';

@Module({
  imports: [TypegooseModule.forFeature([UserEntity])],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
