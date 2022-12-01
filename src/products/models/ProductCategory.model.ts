import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Category } from './Category.model';
  import { Product } from './Product.model';
  
  @Table({
    timestamps: false
  })
  
  export class ProductCategory extends Model {
    @ForeignKey(() => Product)
    @Column
    productId: number;
  
    @ForeignKey(() => Category)
    @Column
    categoryId: number;
  }
  