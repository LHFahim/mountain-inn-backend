import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  BookingDto,
  BookingQueryDto,
  CreateBookingDto,
  UpdateBookingDto,
} from './dto/booking.dto';
import { BookingEntity } from './entities/booking.entity';

@Injectable()
export class BookingService extends SerializeService<BookingEntity> {
  constructor(
    @InjectModel(BookingEntity)
    private readonly bookingModel: ReturnModelType<typeof BookingEntity>,
  ) {
    super(BookingEntity);
  }

  async create(body: CreateBookingDto) {
    const booking = await this.bookingModel.create({
      ...body,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(booking, BookingDto);
  }

  async findAll(query: BookingQueryDto) {
    const bookings = await this.bookingModel
      .find({
        isActive: true,
        isDeleted: false,
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const bookingsCount = await this.bookingModel
      .countDocuments({
        isActive: true,
        isDeleted: false,
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    return {
      items: this.toJSONs(bookings, BookingDto),
      pagination: {
        total: bookingsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          bookingsCount > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(_id: string) {
    const booking = await this.bookingModel.findOne({
      _id,
      isDeleted: false,
      isActive: true,
    });
    if (!booking) throw new NotFoundException('Booking is not found');

    return this.toJSON(booking, BookingDto);
  }

  async updateOne(_id: string, body: UpdateBookingDto) {
    const cabin = await this.bookingModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { ...body },
      { new: true },
    );
    if (!cabin) throw new NotFoundException('Booking is not found');

    return this.toJSON(cabin, BookingDto);
  }

  async deleteOne(_id: string) {
    const booking = await this.bookingModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { isDeleted: true, isActive: false },
      { new: true },
    );
    if (!booking) throw new NotFoundException('Booking is not found');

    return this.toJSON(booking, BookingDto);
  }
}
