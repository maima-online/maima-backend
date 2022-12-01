import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  logo: string;

  @IsOptional()
  categories: string | string[];
  
  @IsOptional()
  subcategories: string | string[];
}
