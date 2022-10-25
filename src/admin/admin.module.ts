import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from 'src/products/models/Brand.model';
import { Category } from 'src/products/models/Category.model';
import { Condition } from 'src/products/models/Condition.model';
import { Product } from 'src/products/models/Product.model';
import { SubCategory } from 'src/products/models/SubCategory.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product, Brand, Condition, SubCategory])],

  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
