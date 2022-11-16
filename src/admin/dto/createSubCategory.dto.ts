import { IsNotEmpty, IsUUID, IsString, ValidateNested} from 'class-validator';
import { Type } from "class-transformer";

class MyClass {
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class CreateSubCategoryDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => MyClass)
  names: MyClass[];

  @IsNotEmpty()
  @IsUUID()
  categories: string | string[];
}



// class WrapperClass {
//   @ValidateNested({ each: true })
//   list: MyClass[]
// }