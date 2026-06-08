import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('file-upload')
export class FileUploadController {

  constructor(private readonly fileUploadService: FileUploadService){}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))

  async uploadFile( 

    @UploadedFile() file: Express.Multer.File,
    @Body() UploadFileDto : UploadFileDto,
    @currentUser() user : User
  
  ): Promise<any>{
    if(!file){
      throw new BadRequestException('File is required')
    }

    return this.fileUploadService.uploadFile(file, UploadFileDto.description, user)
  }
  
  
}
