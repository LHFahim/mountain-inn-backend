import { ControllersEnum } from '../enum/controllers.enum';

export const Routes = {
  [ControllersEnum.Auth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
  },
  [ControllersEnum.Users]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
  [ControllersEnum.Cabins]: {
    create: '',
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
    uploadImage: 'upload/image',
  },
  [ControllersEnum.Guests]: {
    create: '',
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
  [ControllersEnum.Bookings]: {
    create: '',
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
  [ControllersEnum.Settings]: {
    create: '',
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },

  [ControllersEnum.Profile]: {
    myProfile: '',
  },
} as const;
