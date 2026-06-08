import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const cloud_name = configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const api_key = configService.get<string>('CLOUDINARY_API_KEY');
    const api_secret = configService.get<string>('CLOUDINARY_API_SECRET');

    console.log('CLOUDINARY VALUES:', {
      cloud: cloud_name,
      key: api_key,
      secret: api_secret ? 'OK' : 'MISSING',
    });

    if (!cloud_name || !api_key || !api_secret) {
      throw new Error('Missing Cloudinary environment variables');
    }

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });

    return cloudinary;
  },
};
