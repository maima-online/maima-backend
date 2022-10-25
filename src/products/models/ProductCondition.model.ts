import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Condition } from './Condition.model';
import { Product } from './Product.model';

@Table({
  timestamps: false
})

export class ProductCondition extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
  })
  productId: string;

  @ForeignKey(() => Condition)
  @Column({
    type: DataType.UUID,
  })
  conditionId: string;
}
