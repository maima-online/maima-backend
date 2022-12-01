import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
const { Op } = require("sequelize");
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from 'src/products/models/Brand.model';
import { Category } from 'src/products/models/Category.model';
import { SubCategory } from 'src/products/models/SubCategory.model';
import { ProductCondition } from 'src/products/models/ProductCondition.model';
import { ProductCategory } from 'src/products/models/ProductCategory.model';
import { ProductSubCategory } from 'src/products/models/ProductSubCategory.model';
import { Product } from 'src/products/models/Product.model';
import { Condition } from 'src/products/models/Condition.model';
import { unlink } from 'node:fs/promises';
import { access, constants } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Category) private readonly productCategory: typeof Category,
    @InjectModel(SubCategory) private readonly subCategoryModel: typeof SubCategory,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Brand) private readonly brandModel: typeof Brand,
    @InjectModel(Condition) private readonly conditionModel: typeof Condition,
    @InjectModel(ProductCategory) private readonly productCategoryModel: typeof ProductCategory,
    @InjectModel(ProductSubCategory) private readonly productSubCategoryModel: typeof ProductSubCategory,
    @InjectModel(ProductCondition) private readonly productConditionModel: typeof ProductCondition,
  ) {}

// Category
  async getCategories(): Promise<Category[]> {
    return await this.productCategory.findAll();
  }
  async createCategory(category): Promise<Category> {
    return await this.productCategory.create(category);
  }

  async addCategory(category): Promise<any> {
    console.log("hahhaha")
    const findOne = await this.productCategory.findOne({
      where: { name: category.name },
    });
    if (findOne) {
      // console.log(findOne)
      throw new HttpException(
        {
          status: 'error',
          error: 'Category already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const cat = await this.createCategory(category);
    return { status: 'success', message: 'Category added', data: cat };
  }

  async updateCategory(category): Promise<any> {
    const findOne = await this.getCategory(category.id);
    if (
      category.name &&
      findOne.name !== category.name &&
      (await this.productCategory.findOne({ where: { name: category.name } }))
    ) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Category with same name already registered',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.productCategory.update(category, { where: { id: category.id } });
    return { status: 'success', message: 'Category upadated' };
  }

  async deleteCategory(params: string): Promise<any> {
    const category = await this.getCategory(params);
    await category.destroy();
    return { status: 'success', message: 'Category deleted!' };
  }

  // SubCategory
  async getSubCategories(): Promise<Category[]> {
    return await this.productCategory.findAll();
  }
  async createSubCategory(category): Promise<SubCategory[]> {
    console.log(category);
    return await this.subCategoryModel.bulkCreate(category,   {
      ignoreDuplicates: true,
      // updateOnDuplicate: ["name"],
      validate: true
    });
  }
  async addSubCategory(category): Promise<any> {
    function removeDuplicates(array = []) {
      let uniq = {};
      return array.filter(obj => !uniq[obj.name] && (uniq[obj.name] = true))
    }
    const arr = removeDuplicates(category?.names);

    for (const object of arr){
    const findOne = await this.subCategoryModel.findOne({
      where: { 
        name: object.name
       },
    });
    if (findOne) {
      // console.log(findOne)
      throw new HttpException(
        {
          status: 'error',
          error: `${object.name} already exists`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
    const cat = await this.createSubCategory(arr);
    for (const song of cat) {
      console.log(category.categories, "cates");
      await song.$add('category', category.categories);
    }
    return { status: 'success', message: 'Sub-category added', data: cat };
  }

  async updateSubCategory(category): Promise<any> {
    const findOne = await this.getSubCategory(category.id);
    if (
      category.name &&
      findOne.name !== category.name &&
      (await this.subCategoryModel.findOne({ where: { 
        name: category.name 
        // [Op.and]: [{ name: category.name }, { categoryId: category.categoryId }]
      } }))
    ) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Sub-category with name already registered',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.subCategoryModel.update(category, { where: { id: category.id } });
    return { status: 'success', message: 'Sub-category upadated' };
  }
  async deleteSubCategory(params: string): Promise<any> {
    const category = await this.getSubCategory(params);
    await category.destroy();
    return { status: 'success', message: 'Sub-Category deleted!' };
  }

  // Brand

  async getBrand(params: string): Promise<Brand> {
    const brand = await this.getBrandById(params);
    return brand
  }
  async getBrands(): Promise<Brand[]> {
    return await this.brandModel.findAll();
  }
  async addBrand(brand: any): Promise<Brand> {
    console.log(brand)
    const findOne = await this.brandModel.findOne({
      where: { name: brand.name },
    });
    if (findOne) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Brand already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const data = await this.brandModel.create(brand);
    // if (brand?.categories) {
    //   await data.$add('categories', brand.categories);
    // }
    // if (brand?.subcategories) {
    //   await data.$add('subCategories', brand.subcategories);
    // }
    return data;
  }

  async updateBrand(brand: any): Promise<any> {
    const findOne = await this.brandModel.findOne({
      where: { name: brand.name },
    });
    if (findOne && findOne?.id !== brand.id) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Brand already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.brandModel.update(brand, { where: { id: brand.id } });
    if (findOne?.logo && brand.logo) {
      const path = join(process.cwd(), 'uploads', 'brands', `${findOne.logo}`);
      access(path, constants.F_OK, async (e) => {
        e ? '' : await unlink(path);
      });
    }
    return { status: 'success', message: 'Condition updated' };
  }

  async deleteBrand(params: string): Promise<any> {
    const brand = await this.getBrandById(params);
    await brand.destroy();
    // process.cwd(), 'uploads', 'products'
    if(brand?.logo){
      const path = join(process.cwd(), 'uploads', 'brands', `${brand.logo}`);
      await unlink(path);
    }
    return { status: 'success', message: 'Condition deleted!' };
  }

  async getBrandById(params: string): Promise<Brand> {
    const brand = await this.brandModel.findByPk(params);
    if (!brand) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Brand not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return brand;
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async deleteCondition(params: string): Promise<any> {
    const condition = await this.getCondition(params);
    await condition.destroy();
    const path = join(
      process.cwd(),
      'uploads',
      'conditions',
      `${condition.logo}`,
    );
    await unlink(path);
    return { status: 'success', message: 'Condition deleted!' };
  }

  async deleteProduct(params: string): Promise<any> {
    const product = await this.getProductById(params);
    await product.destroy();
    // process.cwd(), 'uploads', 'products'
    if(Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach( async image =>{
        const path = join(process.cwd(), 'uploads', 'product', `${image}`);
        await unlink(path);
      } )
    }else{
      const path = join(process.cwd(), 'uploads', 'product', `${product.images}`);
      await unlink(path);
    }
    return { status: 'success', message: 'Condition deleted!' };
  }

  async addProduct(product): Promise<Product> {
    const findOne = await this.productModel.findOne({
      where: { [Op.and]: [{ name: product.name}, { brandId: product.brandId }]}
    });
    if (findOne) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Product already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const firstLatter = product?.name.charAt(0);
    const cap = firstLatter.toUpperCase();
    let num = 4;

    const newdata = {
      ...product,
      // suggestions:  this.checkArrayDate(product?.suggestions) || [],
      // categories: this.checkArrayDate(product.categories),
      // subCategories: this.checkArrayDate(product.subCategories),
      code: this.generateOTP(cap, num)
    }
    console.log(newdata)
    const data = await this.productModel.create(newdata);
    console.log(data, "data")
   
    if (product?.categories) {
      if(Array.isArray(product?.categories)){
        for (const prod of newdata?.categories) {
          console.log(prod, "prod")
          await data.$add('category',  prod);
        }
      } else
      await data.$add('category',  product?.categories);
    }
    if (product?.subCategories) {
      if(Array.isArray(product?.subCategories)){
      for (const prod of newdata.subCategories) {
        console.log(prod, "subprod")
      await data.$add('subCategories', prod);
      }
    }else
    await data.$add('subCategories', newdata.subCategories);
    }
    return data;
  }

  async updateProduct(product:any): Promise<any> {
    console.log(product)
    const findOne = await this.productModel.findByPk(product?.id);
    if (!findOne) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    } 
    // console.log(product, "updateProduct")
    // await this.conditionModel.update(condition, { where:{id: condition.id }});
    await this.productSubCategoryModel.destroy({
      where: {
        productId: findOne.id
      }
    })
    await this.productCategoryModel.destroy({
      where: {
        productId: findOne.id
      }
    })
    const newdata = {
      ...product,
      // suggestions: this.checkArrayDate(product?.suggestions),
      // categories: this.checkArrayDate(product.categories),
      // subCategories: this.checkArrayDate(product.subCategories),
      code: findOne?.code || "A0000"
    }
    console.log(newdata)
    const data = await this.productModel.update(newdata, {
      where: { id: newdata.id },
    });

    // console.log(data instanceof this.productConditionModel);
    // if (product?.categories) {
    //   findOne.$add('categories', product.categories);
    // }
    // if (product?.subCategories) {
    //   findOne.$add('subCategories', product.subCategories);
    // }
    // console.log(data);
    if (product?.categories) {
      if(Array.isArray(product?.categories)){
        for (const prod of newdata?.categories) {
          console.log(prod, "prod")
          await findOne.$add('category',  prod);
        }
      } else
      await findOne.$add('category',  product?.categories);
    }
    if (product?.subCategories) {
      if(Array.isArray(product?.subCategories)){
      for (const prod of newdata.subCategories) {
        console.log(prod, "subprod")
      await findOne.$add('subCategories', prod);
      }
    }else
    await findOne.$add('subCategories', newdata.subCategories);
    }

    return data;
  }

  async addCondition(condition): Promise<any> {
    const findOne = await this.conditionModel.findOne({
      where: { name: condition.name },
    });
    if (findOne) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Condition already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.conditionModel.create(condition);
    return { status: 'success', message: 'Condition added' };
  }

  async updateCondition(condition): Promise<any> {
    console.log(condition);
    const findOne = await this.conditionModel.findOne({
      where: { name: condition.name },
    });
    console.log(findOne);
    if (findOne && findOne.id !== condition.id) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Condition already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.conditionModel.update(condition, {
      where: { id: condition.id },
    });
    if (findOne?.logo && condition.logo) {
      const path = join(
        process.cwd(),
        'uploads',
        'conditions',
        `${findOne.logo}`,
      );
      access(path, constants.F_OK, async (e) => {
        e ? '' : await unlink(path);
      });
    }
    return { status: 'success', message: 'Condition updated' };
  }

  async getCategory(params: string): Promise<Category> {
    const category = await this.productCategory.findByPk(params);
    if (!category) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Category not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async getSubCategory(params: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel.findByPk(params);
    if (!subCategory) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Sub-Category not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return subCategory;
  }

  async getCondition(params: string): Promise<Condition> {
    const condition = await this.conditionModel.findByPk(params);
    if (!condition) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Category not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return condition;
  }

  async getProductById(params: string): Promise<Product> {
    const condition = await this.productModel.findByPk(params);
    if (!condition) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return condition;
  }
// generate otp token
generateOTP(a: string, num: number){
  const optLength = num;
  let otp = '';
  for (let i = 0; i < optLength; i++){
    otp += Math.floor(Math.random() * 9)
  }
  return a+otp
  // console.log(otp, "oufldjkhssfipkl;jbnpdiklsjfkbln");
}
checkArrayDate = (arr: any)=>{
  if(!Array.isArray(arr)){
   if(!arr){
    arr = [];
   }
   arr = [arr];
  }
  return arr;
}

  async getFile(params): Promise<any> {
    const arr = ['brands', 'products', 'conditions'];
    const filter = arr.includes(params?.filter);
    if (
      filter &&
      params?.filter === 'brands' &&
      (await this.brandModel.findOne({ where: { logo: params?.id } }))
    ) {
      return;
    } else if (
      filter &&
      params?.filter === 'products' &&
      (await this.productModel.findOne({ where: { image: params?.id } }))
    ) {
      return;
    } else if (
      filter &&
      params?.filter === 'conditions' &&
      (await this.conditionModel.findOne({ where: { logo: params?.id } }))
    ) {
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
