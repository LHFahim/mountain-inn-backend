import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { CabinEntity } from 'src/cabin/entities/cabin.entity';
import { bookingData } from './data/dummy-data';
import {
  BookingDto,
  BookingQueryDto,
  CreateBookingDto,
  UpdateBookingDto,
} from './dto/booking.dto';
import { BookingEntity, BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingService extends SerializeService<BookingEntity> {
  constructor(
    @InjectModel(BookingEntity)
    private readonly bookingModel: ReturnModelType<typeof BookingEntity>,
    @InjectModel(CabinEntity)
    private readonly cabinModel: ReturnModelType<typeof CabinEntity>,
  ) {
    super(BookingEntity);
  }

  async onModuleInit() {
    for (const obj of bookingData) {
      await this.bookingModel.updateOne(
        {
          cabin: obj.cabin,
          guest: obj.guest,
        },
        {
          $setOnInsert: {
            ...obj,

            numberOfNights: 0,
            cabinPrice: 0,
            extraPrice: 0,
            totalPrice: 0,
            status: BookingStatus.UNCONFIRMED,

            isActive: true,
            isDeleted: false,
          },
        },
        { upsert: true },
      );
    }
  }

  async create(body: CreateBookingDto) {
    const cabin = await this.cabinModel.findOne({ _id: body.cabin });
    if (!cabin) throw new NotFoundException('Cabin is not found');

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

        ...(query.status && { status: query.status }),

        ...(query.startDate && { startDate: { $gte: query.startDate } }),
      })
      .populate('guest')
      .populate('cabin')
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const bookingsCount = await this.bookingModel.countDocuments({
      isActive: true,
      isDeleted: false,

      ...(query.status && { status: query.status }),

      ...(query.startDate && { startDate: { $gte: query.startDate } }),
    });

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
    const booking = await this.bookingModel
      .findOne({
        _id,
        isDeleted: false,
        isActive: true,
      })
      .populate('guest')
      .populate('cabin');
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
