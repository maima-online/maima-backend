import { IsIn, IsNotEmpty, IsOptional, IsUUID} from 'class-validator';

export class UpdateSubCategoryDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsOptional()
    name: string;

    // @IsOptional()
    // @IsUUID()
    // categoryId: string;
}
