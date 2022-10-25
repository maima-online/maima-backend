import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/Product.model';
import { Rating } from './models/Rating.model';
import { Address } from './models/Address.model'
import { Condition } from './models/Condition.model'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Category } from './models/Category.model';
import { Brand } from './models/Brand.model';
import { SubCategory } from './models/SubCategory.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Rating, Address, Condition, Category, Brand, SubCategory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
