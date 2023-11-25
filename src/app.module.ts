import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppService } from './app.service';
import { validate } from './config/env.validation';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CabinModule } from './cabin/cabin.module';
import { GuestModule } from './guest/guest.module';
import { SettingsModule } from './settings/settings.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ConfigModule,
    UserModule,
    AuthModule,
    CabinModule,
    GuestModule,
    SettingsModule,
    BookingModule,
  ],
  controllers: [],
  providers: [AppService, ConfigService],
})
export class AppModule {}
