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
  IsUUID
} from 'class-validator';

const today = new Date()

const event =  today.toISOString()
export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumberString()
  price: number;

  @IsNumberString()
  quantity: number;

  @IsOptional()
  @IsNumberString()
  discount: number | null;

  @IsOptional()
  @IsDateString() 
  expDate: Date;

  @IsNotEmpty()
  description: string;
  
  @IsOptional()
  packagingType: string;

  @IsOptional()
  categories: string | string[];

  @IsOptional()
  @IsUUID()
  subCategories: string | string[];

  @IsOptional()
  @IsArray()
  @IsUUID()
  suggestions: string[];

  @IsOptional()
  // @IsArray()
  @IsUUID()
  conditions: string | string[];

  @IsNotEmpty()
  @IsUUID()
  brandId: string;

  @IsOptional()
  images: string | string[];
}
