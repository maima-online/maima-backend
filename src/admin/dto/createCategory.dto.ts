import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  subtitle: string;
}
