import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { User } from 'src/auth/entities/user.entity';
import { UploadFile } from './entities/file.entity';


@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(UploadFile)
    private readonly fileRepository: Repository<UploadFile>,
    private readonly cloudinaryservice : CloudinaryService  
  ) {}

  async uploadFile(file: Express.Multer.File, description : string | undefined, user : User) : Promise<UploadFile>{
    const cloudinaryResponse = await this.cloudinaryservice.uploadFile(file);

    const newlyCreatedUploadFile = this.fileRepository.create({
      originalName : file.originalname,
      mimeType: file.mimetype,
      size : file.size,
      publicId : cloudinaryResponse?.public_id,
      url : cloudinaryResponse?.secure_url,
      description,
      uploader: user

    })

    return this.fileRepository.save(newlyCreatedUploadFile)
  }

  async findAll() : Promise<UploadFile[]>{
    return this.fileRepository.find({
      relations : ['uploader'],
      order: { createdAt : 'DESC'}
    })
  }

  async remove(id: string): Promise<void>{
    const fileToBeDeleted = await this.fileRepository.findOne({
      where : {id}
    })

    if(!fileToBeDeleted){
      throw new NotFoundException(`File with ID ${id} not found!`)
    }


    // delete from cloudinary
    await this.cloudinaryservice.deleteFile(fileToBeDeleted.publicId)

    // delete from Database
    await this.fileRepository.remove(fileToBeDeleted);
  }
}
 