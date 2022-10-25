import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './Brand.model';
import { SubCategory } from './SubCategory.model';

@Table({
  timestamps: false
})

export class BrandSubCategory extends Model {
  @ForeignKey(() => Brand)
  @Column
  brandId: number;

  @ForeignKey(() => SubCategory)
  @Column
  subCategoryId: number;
}
