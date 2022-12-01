import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product.model';
import { ProductCondition } from './ProductCondition.model';

@Table({
  timestamps: false
})

export class Condition extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  logo: string;

  @BelongsToMany(() => Product, () => ProductCondition)
  categories: Product[];
}
