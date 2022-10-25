import {
    IsNotEmpty,
    Length,
  } from 'class-validator';
  
  export class ResetPasswordDto {
    @IsNotEmpty()
    token: string;

    @Length(6, 20)
    password: string;

  }