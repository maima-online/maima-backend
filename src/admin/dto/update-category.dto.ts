import { IsIn, IsNotEmpty, IsOptional, IsUUID} from 'class-validator';

export class UpdateCategoryDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    subtitle: string;
}
