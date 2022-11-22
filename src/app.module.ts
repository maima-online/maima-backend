import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from './accounts/accounts.module';
import { User } from './accounts/models/User.model';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { Product } from './products/models/Product.model';
import { Category } from './products/models/Category.model';
import { SubCategory } from './products/models/SubCategory.model';
import { ProductSubCategory } from './products/models/ProductSubCategory.model';
import { Cart } from './accounts/models/Cart.model';
import { ProductCondition } from './products/models/ProductCondition.model';
import { Condition } from './products/models/Condition.model';
import { Brand } from './products/models/Brand.model';
// import { BrandSubCategory } from './products/models/BrandSubCategory.model';
import { CategorySubCategory } from './products/models/CategorySubCategory.model';
// import { BrandCategory } from './products/models/BrandCategory.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        Product,
        Category,
        SubCategory,
        ProductSubCategory,
        Condition,
        ProductCondition,
        Cart,
        Brand,
        // BrandSubCategory,
        // BrandCategory,
        CategorySubCategory
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    AccountsModule,
    ProductsModule,
    AdminModule,
  ],
})
export class AppModule {}
