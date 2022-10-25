import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BrandSubCategory } from './BrandSubCategory.model';
import { SubCategory } from './SubCategory.model';
import { Category } from './Category.model';
import { BrandCategory } from './BrandCategory.model';


@Table({
  timestamps: false,
})
export class Brand extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  logo: string;

  @BelongsToMany(() => SubCategory, () => BrandSubCategory)
  subCategories: SubCategory[];

  @BelongsToMany(() => Category, () => BrandCategory)
  Categories: Category[];
}
