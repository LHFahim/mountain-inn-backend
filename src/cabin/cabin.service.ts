import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CabinDto,
  CabinPaginatedDto,
  CabinQueryDto,
  CreateCabinDto,
  UpdateCabinDto,
} from './dto/cabin.dto';
import { CabinEntity, CabinStatusEnum } from './entities/cabin.entity';

@Injectable()
export class CabinService extends SerializeService<CabinEntity> {
  constructor(
    @InjectModel(CabinEntity)
    private readonly cabinModel: ReturnModelType<typeof CabinEntity>,
  ) {
    super(CabinEntity);
  }

  async create(body: CreateCabinDto) {
    const cabin = await this.cabinModel.create({
      ...body,
      isActive: true,
      isDeleted: false,
      images: [],
      status: CabinStatusEnum.AVAILABLE,
    });
    if (!cabin) throw new BadRequestException('Cabin could not be made');

    return this.toJSON(cabin, CabinDto);
  }

  async findAll(query: CabinQueryDto): Promise<CabinPaginatedDto> {
    const cabins = await this.cabinModel
      .find({ isDeleted: false, isActive: true })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const cabinsCount = await this.cabinModel
      .countDocuments()
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    return {
      items: this.toJSONs(cabins, CabinDto),
      pagination: {
        total: cabinsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          cabinsCount > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(_id: string) {
    const cabin = await this.cabinModel.findOne({
      _id,
      isDeleted: false,
      isActive: true,
    });
    if (!cabin) throw new NotFoundException('Cabin is not found');

    return this.toJSON(cabin, CabinDto);
  }

  async updateOne(_id: string, body: UpdateCabinDto) {
    const cabin = await this.cabinModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { ...body },
      { new: true },
    );
    if (!cabin) throw new NotFoundException('Cabin is not found');

    return this.toJSON(cabin, CabinDto);
  }

  async deleteOne(_id: string) {
    const cabin = await this.cabinModel.findOneAndUpdate(
      {
        _id,
        isDeleted: false,
        isActive: true,
      },
      { isDeleted: true, isActive: false },
      { new: true },
    );
    if (!cabin) throw new NotFoundException('Cabin is not found');

    return this.toJSON(cabin, CabinDto);
  }
}
