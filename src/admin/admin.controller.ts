import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  Delete,
  UseGuards,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import path from 'node:path';
import { Response } from 'express';
import { JwtAuthGuard } from '../accounts/guards/jwt-auth.guard';
import { createReadStream, access, constants } from 'fs';
import { join } from 'path';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminService } from './admin.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
// import { 
//   UpdateSubCategoryDto
//  } from './dto/updateSubCategory.dto';
import { UpdateSubCategoryDto } from './dto/updateSubcategory.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateConditionDto } from './dto/createCondition.dto';
import { UpdateConditionDto } from './dto/updateCondition.dto';
import { updateBrandDto } from './dto/update-brand.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('categories')
  async addCategory(@Body() body: CreateCategoryDto) {
    try {
      const category = await this.adminService.addCategory(body);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('subcategory')
  async addSubCategory(@Body() body: CreateSubCategoryDto) {
    try {
      const category = await this.adminService.addSubCategory(body);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('categories')
  async updateCategory(@Body() body: UpdateCategoryDto) {
    try {
      const category = await this.adminService.updateCategory(body);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('subcategory')
  async updateSubCategory(@Body() body: UpdateSubCategoryDto) {
    try {
      const category = await this.adminService.updateSubCategory(body);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.adminService.deleteCategory(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('subcategories/:id')
  async deleteSubCategory(@Param('id') id: string) {
    try {
      return await this.adminService.deleteSubCategory(id);
    } catch (error) {
      throw error;
    }
  }

  // NB - Remember to add validation to check that the categories exist
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('product')
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'products'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async addProduct(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files) body.images = files.map((file) => file.filename);
    try {
      const product = await this.adminService.addProduct(body);
      return { status: 'success', message: 'Product added', data: product };
    } catch (error) {
      throw error
     
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('product')
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'products'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateProduct(
    @Body() body: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files) body.images = files.map((file) => file.filename);
  
    try {
      const product = await this.adminService.updateProduct(body);
      return { status: 'success', message: 'Product updated', data: product };
    } catch (error) {
      throw error
     
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.adminService.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }


  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('condition')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'conditions'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async addCondition(
    @Body() body: CreateConditionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        const { buffer, ...rest } = file;
        body.logo = rest.filename;
      }
      return await this.adminService.addCondition(body);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('condition')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'conditions'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateCondition(
    @Body() body: UpdateConditionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        const { buffer, ...rest } = file;
        body.logo = rest.filename;
      }
      return await this.adminService.updateCondition(body);
    } catch (error) {
      throw error;
    }
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('condition/:id')
  async deleteCondition(@Param('id') id: string) {
    try {
      return await this.adminService.deleteCondition(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('product')
  async getProducts() {
    try {
      const products = await this.adminService.getProducts();
      return { status: 'success', message: 'Products fetched', data: products };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('brands')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'brands'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async addBrand(
    @Body() body: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        console.log(file)
        const { buffer, ...rest } = file;
        body.logo = rest.filename;
      }
      await this.adminService.addBrand(body);
      return { status: 'success', message: 'Brand Added' };
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('brands')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'brands'),
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateBrand(
    @Body() body: updateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        const { buffer, ...rest } = file;
        body.logo = rest.filename;
      }
      await this.adminService.updateBrand(body);
      return { status: 'success', message: 'Brand updated' };
    } catch (error) {
      throw error;
    }
  }


  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('brand/:id')
  async deleteBrand(@Param('id') id: string) {
    try {
      return await this.adminService.deleteBrand(id);
    } catch (error) {
      throw error;
    }
  }

  //get single brand
  @Get('brand/:id')
  async getBrand(@Param('id') id) {
    try {
      const brand = await this.adminService.getBrand(id);
      return { status: 'success', message: 'Brand fetched', data: brand };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

    //get brands
    @Get('brands')
    async getBrands() {
      try {
        const brand = await this.adminService.getBrands();
        return { status: 'success', message: 'Brands fetched', data: brand };
      } catch (error) {
        throw new HttpException(
          {
            status: 'error',
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }

  //display brand on the frontend
  @Get('image/:filter/:id')
  async getFile(@Param() params, @Res() res: Response) {
    const path = join(
      process.cwd(),
      'uploads',
      `${params.filter}`,
      `${params.id}`,
    );
    // const path1 = join(process.cwd(), 'uploads', `brands`, `_20160831_120149-1b9f.jpeg`)
    await this.adminService.getFile(params);
    const file = createReadStream(path);
    return file.pipe(res);
  }
}
