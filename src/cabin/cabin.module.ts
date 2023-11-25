import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CabinController } from './cabin.controller';
import { CabinService } from './cabin.service';
import { CabinEntity } from './entities/cabin.entity';

@Module({
  imports: [TypegooseModule.forFeature([CabinEntity])],
  controllers: [CabinController],
  providers: [CabinService],
})
export class CabinModule {}
