import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, {message: 'Please provide a valid email'})
  email!: String;

  @IsNotEmpty({message : 'Name is required! Please provide name'})
  @IsString({ message: 'Name must be a string'})
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name can not be longer than 50 characters' })
    title!: string;


  @IsNotEmpty({ message: 'Password is required! please provide password'})
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password! : string;
}