import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
// import { Op } from 'sequelize';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AccountsService } from './accounts.service';
import { AddCartItemDto } from './dto/add-cart.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-pasword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.accountsService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    try {
      const user = this.accountsService.addNewUser(body);
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto,  @Request() req) {
    // console.log(req.get('origin'))
    console.log(req.get('origin'), "req")
    const { email } = body
    try {
      const user = this.accountsService.forgotPassword(email, req.get('origin') );
      return user
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    try {
      const user = this.accountsService.resetPassword(body);
      return  user
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  
  // @UseGuards(RolesGuard(Role.Admin))
  // @SetMetadata('roles', ['admin'])
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard )
  @Put('update')
  async update(@Body() body: UpdateUserDto,  @Request() req) {
      body.id = req.user.userId;
    try {
      const user = this.accountsService.updateUser(body);
      return user
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('cart')
  getCartItems() {
    return this.accountsService.getCartItems();
  }

  @UseGuards(JwtAuthGuard)
  @Post('cart')
  addToCart(@Body() body: AddCartItemDto, @Request() req) {
    body.userId = req.user.userId;
    try {
      return this.accountsService.addToCart(body);
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
