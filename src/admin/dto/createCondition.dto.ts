import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';

export class CreateConditionDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
  
    logo: string | string[];
  }
  