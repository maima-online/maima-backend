import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, WhereOptions } from 'sequelize/types';
import { Brand } from './models/Brand.model';
import { Category } from './models/Category.model';
import { Product } from './models/Product.model';
import { Condition } from './models/Condition.model';
import { SubCategory } from './models/SubCategory.model';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly product: typeof Product,
    @InjectModel(Condition) private readonly condition: typeof Condition,
    @InjectModel(Category) private readonly category: typeof Category,
    @InjectModel(SubCategory) private readonly subcategory: typeof SubCategory,
    @InjectModel(Brand) private readonly brand: typeof Brand,
  ) {}

  async getConditions(): Promise<Condition[]>{
    return  await this.condition.findAll();
  }

  async getCondition({condition, limit, offset}): Promise<{}>{
    return  await this.condition.findAndCountAll({ where: condition, limit, offset });
  }

  async getCategories(): Promise<Category[]>{
    return  await this.category.findAll({
      include: [SubCategory],
    });
  }

  async getSubCategories(): Promise<SubCategory[]>{
    return  await this.subcategory.findAll({ include: [{ all: true }] });
  }

  async getBrands(): Promise<Brand[]>{
    return  await this.brand.findAll({ include: [{ all: true }] });
  }
  async getProduct(params: WhereOptions): Promise<Product> {
    return await this.product.findOne({
      include: [Category, Brand],
      where: params,
    });
  }

  async getProducts(params: FindAndCountOptions = {}): Promise<{
    rows: Product[];
    count: number;
  }> {
    const query = {
      limit: 6,
      offset: 0,
      include: [Category, Brand],
      ...params,
    };
    return await this.product.findAndCountAll(query);
  }
}


    //  [
    //   {
    //     name: 'Illness 1',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 2',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 3',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 4',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 5',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 6',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 7',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 8',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    //   {
    //     name: 'Illness 9',
    //     icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-illness-lifestyles-flaticons-lineal-color-flat-icons-2.png',
    //   },
    // ];