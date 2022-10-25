import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsPhoneNumber,
    Length,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsNotEmpty()
    firstName: string;

    id: string;
    
    @IsNotEmpty()
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsPhoneNumber('NG')
    phone: string;
  
    pholioNumber?: string;
  
    @Length(6, 20)
    password: string;
  
    // @IsIn(['user', 'doctor'])
    // userType: string;
  }