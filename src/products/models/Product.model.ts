import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './Brand.model';
import { SubCategory } from './SubCategory.model';
import { Category } from './Category.model';
import { Condition } from './Condition.model';
import { ProductSubCategory } from './ProductSubCategory.model';
import { ProductCategory } from './ProductCategory.model';
import { ProductCondition } from './ProductCondition.model';

@Table({
  timestamps: false
})

export class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  code: string;

  @Column({ allowNull: false, defaultValue: 0  })
  quantity: number;

  @Column({ defaultValue: 0 })
  discount: number;

  @Column
  expDate: Date;

  // @Column({ type: DataType.ENUM('paper box', 'sachet', "bottle") })
  @Column
  packagingType: string;

  @Column
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue: []
  })
  suggestions: string[];

  @Column({ allowNull: false })
  image: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @BelongsToMany(() => SubCategory, () => ProductSubCategory)
  subCategories: SubCategory[];

  @BelongsToMany(() => Condition, () => ProductCondition)
  conditions: Condition[];

  @BelongsTo(() => Brand, 'brandId')
  brand: Brand;
}
