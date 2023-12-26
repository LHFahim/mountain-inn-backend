import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';

import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { StorageService } from 'src/storage/storage.service';
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
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
  ) {
    super(CabinEntity);
  }

  async onModuleInit() {
    for (const obj of cabinsData) {
      await this.cabinModel.updateOne(
        {
          name: obj.name,
        },
        {
          $setOnInsert: {
            ...obj,
            isActive: true,
            isDeleted: false,
            images: [],
            status: CabinStatusEnum.AVAILABLE,
          },
        },
        { upsert: true },
      );
    }
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

  async uploadImage(userId: string, image: Express.Multer.File) {
    const fileUrl = await this.storageService.uploadFile(
      userId,
      'cabins',
      image,
    );
    if (!fileUrl) throw new BadRequestException('File could not be uploaded');

    return fileUrl;
  }
}

export const cabinsData = [
  {
    name: '001',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: 'https://i.ibb.co/MCQ7jFF/cabin-001.jpg',
    description:
      'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
  },
  {
    name: '002',
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: 'https://i.ibb.co/ssxKXGD/cabin-002.jpg',
    description:
      'Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.',
  },
  {
    name: '003',
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: 'https://i.ibb.co/DDvTDyB/cabin-003.jpg',
    description:
      'Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.',
  },
  {
    name: '004',
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: 'https://i.ibb.co/yWnPFyq/cabin-004.jpg',
    description:
      'Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '005',
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: 'https://i.ibb.co/9nhncNh/cabin-005.jpg',
    description:
      'Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '006',
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: 'https://i.ibb.co/sqGLSKm/cabin-006.jpg',
    description:
      'Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '007',
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: 'https://i.ibb.co/b250f71/cabin-007.jpg',
    description:
      'Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.',
  },
  {
    name: '008',
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: 'https://i.ibb.co/f1CvjJL/cabin-008.jpg',
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
