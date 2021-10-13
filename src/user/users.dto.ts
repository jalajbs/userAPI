import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class usersDTO {
  @IsNumber()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
