import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SubCategory } from './SubCategory.model';
import { Product } from './Product.model';

@Table({
  timestamps: false
})

export class ProductSubCategory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => SubCategory)
  @Column
  subCategoryId: number;
}
