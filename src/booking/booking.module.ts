import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CabinEntity } from 'src/cabin/entities/cabin.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './entities/booking.entity';

@Module({
  imports: [TypegooseModule.forFeature([BookingEntity, CabinEntity])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
