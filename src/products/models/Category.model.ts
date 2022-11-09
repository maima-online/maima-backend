import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { SubCategory } from './SubCategory.model';
import { CategorySubCategory } from './CategorySubCategory.model';

@Table({
  timestamps: false
})

export class Category extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column
  subtitle: string;

  @BelongsToMany(() => SubCategory, () => CategorySubCategory)
  subCategory: SubCategory[];
}
