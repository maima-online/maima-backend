import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateBrandDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  logo: string;

  //   @IsNotEmpty()
  @IsOptional()
  categories: string | string[];

  @IsOptional()
  subcategories: string | string[];
}
