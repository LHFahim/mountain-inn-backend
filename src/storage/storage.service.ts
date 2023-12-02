import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class StorageService extends SerializeService<UserEntity> {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super(UserEntity);
  }

  async uploadFile(
    userId: string,
    bucket: string,
    image: Express.Multer.File,
  ): Promise<string> {
    const firebaseConfig = {
      apiKey: this.configService.get('API_KEY'),
      authDomain: this.configService.get('AUTH_DOMAIN'),
      projectId: this.configService.get('PROJECT_ID'),
      storageBucket: this.configService.get('STORAGE_BUCKET'),
      messagingSenderId: this.configService.get('MESSAGING_SENDER_ID'),
      appId: this.configService.get('APP_ID'),
    };

    initializeApp(firebaseConfig);
    const storage = getStorage();

    const storageRef = ref(
      storage,
      `${bucket}/${image.originalname}_${userId}_${new Date().getTime()}`,
    );

    const metaData = {
      contentType: image.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      image.buffer,
      metaData,
    );

    return await getDownloadURL(snapshot.ref);
  }
}
