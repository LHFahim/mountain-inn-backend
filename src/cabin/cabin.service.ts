import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { CabinDto, CreateCabinDto, UpdateCabinDto } from './dto/cabin.dto';
import { CabinEntity } from './entities/cabin.entity';

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
    });

    if (!cabin) throw new BadRequestException('Cabin could not be made');
    return this.toJSON(cabin, CabinDto);
  }

  findAll() {
    return `This action returns all cabin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cabin`;
  }

  update(id: number, updateCabinDto: UpdateCabinDto) {
    return `This action updates a #${id} cabin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cabin`;
  }
}
