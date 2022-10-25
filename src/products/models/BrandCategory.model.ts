import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Brand } from './Brand.model';
  import { Category } from './Category.model';
  
  @Table({
    timestamps: false
  })
  
  export class BrandCategory extends Model {
    @ForeignKey(() => Brand)
    @Column
    brandId: number;
  
    @ForeignKey(() => Category)
    @Column
    categoryId: number;
  }
  