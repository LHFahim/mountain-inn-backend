import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateGuestDto,
  GuestDto,
  GuestPaginatedDto,
  GuestQueryDto,
  UpdateGuestDto,
} from './dto/guest.dto';
import { GuestEntity } from './entities/guest.entity';

@Injectable()
export class GuestService extends SerializeService<GuestEntity> {
  constructor(
    @InjectModel(GuestEntity)
    private readonly guestModel: ReturnModelType<typeof GuestEntity>,
  ) {
    super(GuestEntity);
  }

  async create(body: CreateGuestDto) {
    const guestExists = await this.guestModel.findOne({ email: body.email });
    if (guestExists) throw new ConflictException('Guest already exists');

    const guest = await this.guestModel.create({ ...body });
    return this.toJSON(guest, GuestDto);
  }

  async findAll(query: GuestQueryDto): Promise<GuestPaginatedDto> {
    const guests = await this.guestModel
      .find()
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const guestsCount = await this.guestModel
      .countDocuments()
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    return {
      items: this.toJSONs(guests, GuestDto),
      pagination: {
        total: guestsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          guestsCount > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(_id: string) {
    const guest = await this.guestModel.findOne({
      _id,
      isActive: true,
      isDeleted: false,
    });
    if (!guest) throw new NotFoundException('Guest is not found');

    return this.toJSON(guest, GuestDto);
  }

  async updateOne(_id: string, body: UpdateGuestDto) {
    const guest = await this.guestModel.findOneAndUpdate(
      {
        _id,
        isActive: true,
        isDeleted: false,
      },
      { ...body },
      { new: true },
    );
    if (!guest) throw new NotFoundException('Guest is not found');

    return this.toJSON(guest, GuestDto);
  }

  async deleteOne(_id: string) {
    const guest = await this.guestModel.findOneAndUpdate(
      {
        _id,
        isActive: true,
        isDeleted: false,
      },
      { isActive: false, isDeleted: true },
      { new: true },
    );
    if (!guest) throw new NotFoundException('Guest is not found');

    return this.toJSON(guest, GuestDto);
  }
}
