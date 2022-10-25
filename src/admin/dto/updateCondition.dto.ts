import {

    IsNotEmpty,
    IsUUID,
    MinLength,
  } from 'class-validator';

export class UpdateConditionDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    
    @IsNotEmpty()
    @IsUUID()
    id: string;

    logo: string | string[];
  }
  