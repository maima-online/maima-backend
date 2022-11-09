import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { SubCategory } from './SubCategory.model';
  import { Category } from './Category.model';
  
  @Table({
    timestamps: false
  })
  
  export class CategorySubCategory extends Model {
    @ForeignKey(() => Category)
    @Column
    categoryId: number;
  
    @ForeignKey(() => SubCategory)
    @Column
    subCategoryId: number;
  }