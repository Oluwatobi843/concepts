import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, {message: 'Please provide a valid email'})
  email!: String;



  @IsNotEmpty({ message: 'Password is required! please provide password'})
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password! : string;
}