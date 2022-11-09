import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './Category.model';
import { Product } from './Product.model';
import { ProductSubCategory } from './ProductSubCategory.model';
import { CategorySubCategory } from './CategorySubCategory.model';

@Table({
  timestamps: false,
})
export class SubCategory extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @BelongsToMany(() => Category, () => CategorySubCategory )
  category: Category[];

  @BelongsToMany(() => Product, () => ProductSubCategory)
  products: Product[];
}
