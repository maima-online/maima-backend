import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  userId: string;

  @IsOptional()
  @IsInt()
  quantity: number;
}
