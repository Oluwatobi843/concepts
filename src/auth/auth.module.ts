import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './enitities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports : [
      // this will make the post repository available for injection
      // available in the current 
      // scope
      TypeOrmModule.forFeature([User])
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
