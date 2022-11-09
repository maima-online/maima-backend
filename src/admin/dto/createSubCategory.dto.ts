import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  categories: string | string[];
}
