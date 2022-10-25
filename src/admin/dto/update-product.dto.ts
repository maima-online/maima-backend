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
  
  export class UpdateProductDto {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsOptional()
    @IsNumberString()
    price: number;
  
    currency: string;

    @IsOptional()
    @IsNumberString()
    quantityRemaining: number;
  
    @IsOptional()
    @IsNumberString()
    quantitySupplied: number;
  
    @IsOptional()
    @IsNumberString()
    discount: number | null;
  
    @IsOptional()
    @IsDateString() 
    expDate: Date;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
    @IsIn(['medicine', 'vitamin'])
    type: string;
    
    @IsOptional()
    packagingType: string;
  
    @IsOptional()
    code: string;
  
    @IsOptional()
    categories: string | string[];
  
    @IsOptional()
    @IsUUID()
    brandId: string;

    @IsOptional()
    images: string | string[];
  }
  