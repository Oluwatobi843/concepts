import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}

  async register (registerDto : RegisterDto){
    const existingUser = await this.userRepository.findOne({
      where: {email : registerDto.email}
    })

    if(existingUser){
      throw new ConflictException('Email already in use! Please try with a different email')
    }

    const hashedPassword = await this.hashPassword(registerDto.password)

    const newlyCreatedUser = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: UserRole.USER
    })

    const savedUser = await this.userRepository.save(newlyCreatedUser)

    const {password, ...result} = savedUser;

    return {
      user: result,
      message: 'Registration successfull! Please login to continue'
    }
  }

  private async hashPassword(password: string): Promise<string>{
    return bcrypt.hash(password, 10)
  }
}
