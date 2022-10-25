import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phone: string;

  pholioNumber?: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  // @IsIn(['user', 'doctor'])
  // userType: string;

}
