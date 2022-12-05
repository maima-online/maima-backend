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
  // @IsUUID(undefined, {each:true})
  categories: string | string[];

  @IsOptional()
  // @IsArray()
  // @IsUUID()
  // @IsUUID(undefined, {each:true})
  subCategories: string | string[];

  @IsOptional()
  @IsArray()
  // @IsUUID()
  @IsUUID(undefined, {each:true})
  suggestions: string[];

  @IsOptional()
  // @IsArray()
  // @IsUUID()
  // @IsUUID(undefined, {each:true})
  conditions: string | string[];

  @IsNotEmpty()
  @IsUUID()
  // @IsUUID(undefined, {each:true})
  brandId: string;

  @IsOptional()
  images: string | string[];
}
