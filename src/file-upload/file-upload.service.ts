import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { User } from 'src/auth/entities/user.entity';
import { File } from './entities/file.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly cloudinaryservice : CloudinaryService  
  ) {}

  async uploadFile(file: Express.Multer.File, description : string | undefined, user : User) : Promise<File>{
    const cloudinaryResponse = await this.cloudinaryservice.uploadFile(file);

    const newlyCreatedFile = this.fileRepository.create({
      originalName : file.originalname,
      mimeType: file.mimetype,
      size : file.size,
      publicId : cloudinaryResponse?.public_id,
      url : cloudinaryResponse?.secure_url,
      description,
      uploader: user

    })

    return this.fileRepository.save(newlyCreatedFile)
  }
}
 