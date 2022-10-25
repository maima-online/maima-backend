import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/models/Product.model';
import { User } from './User.model';

@Table({
  timestamps: false
})

export class Cart extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Product, 'productId')
  product: Product;

  @Column({ defaultValue: 0 })
  quantity: number;
}
