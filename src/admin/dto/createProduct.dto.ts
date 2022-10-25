import {
  IsArray,
  IsDate,
  IsIn,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MinDate,
  IsISO8601,
  MinLength,
} from 'class-validator';

const today = new Date()

const event =  today.toISOString()
export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumberString()
  price: number;

  currency: string;

  @IsNumberString()
  quantityRemaining: number;

  @IsNumberString()
  quantitySupplied: number;

  @IsOptional()
  @IsNumberString()
  discount: number | null;

  @IsOptional()
  @IsDateString() 
  expDate: Date;

  @IsNotEmpty()
  description: string;

  @IsIn(['medicine', 'vitamin'])
  type: string;
  
  @IsOptional()
  packagingType: string;

  @IsOptional()
  code: string;

  @IsOptional()
  categories: string | string[];

  @IsNotEmpty()
  brandId: string;

  images: string | string[];
}
