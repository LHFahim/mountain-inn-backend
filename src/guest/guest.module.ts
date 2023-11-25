import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GuestEntity } from './entities/guest.entity';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [TypegooseModule.forFeature([GuestEntity])],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
