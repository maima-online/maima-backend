import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './models/User.model';
import { JwtService } from '@nestjs/jwt';
import { Cart } from './models/Cart.model';
const crypto = require('crypto');
import { Op } from 'sequelize';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-756gqpx19lzm2xkk$5',
});

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
    @InjectModel(Cart) private readonly cart: typeof Cart,
  ) {}

  hashPassword(password: string): string {
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(password, saltOrRounds);
    return hash;
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  findOne(query): Promise<User> {
    return this.userModel.findOne({
      raw: true,
      where: query,
    });
  }

  async createUser(user): Promise<User> {
    user.password = this.hashPassword(user.password);
    if ((await this.userModel.count()) === 0) {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne({ email });
    if (user && this.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async addNewUser(body): Promise<any> {
    const findUser = await this.findOne({
      [Op.or]: [{ email: body.email }, { phone: body.phone }],
    });
    if (findUser) {
      throw new HttpException(
        {
          status: 'error',
          message: 'User already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.createUser(body);
    return {
      status: 'success',
      message: 'Signup is successful, you can now login',
    };
  }

  async login(user: any) {
    // console.log(user)
    const payload = { email: user.email, sub: user.id, roles: [user.role] };
    return {
      accessToken: this.jwtService.sign(payload),
      ...user,
    };
  }

  async getCartItem(id: string): Promise<Cart> {
    return await this.cart.findOne({
      where: {
        productId: id,
      },
    });
  }

  async getCartItems(): Promise<Cart[]> {
    return await this.cart.findAll({ include: [{ all: true }] });
  }

  async newUpdate(user): Promise<User> {
    await this.userModel.update(user, { where: { id: user.id } });
    return;
  }

  async updateUser(body): Promise<any> {
    const findUser = await this.findOne({
      [Op.or]: [{ email: body.email }, { phone: body.phone }],
    });
    if (findUser && findUser.id !== body.id) {
      throw new HttpException(
        {
          status: 'error',
          message: 'User already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (body.password) {
      body.password = this.hashPassword(body.password);
    }
    await this.newUpdate(body);
    return { status: 'success', message: 'User updated' };
  }
  // const user = await this.update(body, { where: { id:body.id } })

  async resetPassword(body): Promise<any> {
    const findToken = await this.findOne({ token: body.token });
    if (!findToken) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Invalid token',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.update(
      { token: null, password: this.hashPassword(body.password) },
      { where: { token: body.token } },
    );
    return {
      status: 'success',
      message: 'Password reset successful, you can now login',
    };
  }

  async addToCart(item): Promise<any> {
    const findCart = await this.getCartItem(item.productId);
    let quantity = findCart ? findCart.quantity : 1;
    if (!findCart) {
      return await this.cart.create(item);
    }
    return await findCart.update({
      ...item,
      quantity: quantity + item.quantity ?? 1,
    });
  }

  async forgotPassword(email, origin): Promise<any> {
    const findEmail = await this.findOne({ email });
    if (!findEmail)
      throw new HttpException(
        {
          status: 'error',
          message: 'Email is not register',
        },
        HttpStatus.NOT_FOUND,
      );
    const token = await this.randomTokenString();
    // console.log(token)
    await this.userModel.update({ token }, { where: { email } });
    await this.sendPasswordResetEmail({ email, token }, origin);
    return {
      status: 'success',
      message: `Please check your email ${email} for password reset instructions`,
    };
  }
  async sendPasswordResetEmail(account, origin): Promise<any> {
    console.log(origin,"origin" )
    let message;
    if (origin) {
      const resetUrl = `${origin}/reset-password/${account.token}`;
      message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
      <p><a href="${resetUrl}" style="
      background-color: #2651a3;
      color: white;
      border: 2px solid #2651a3;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 5px;">Reset Password</a></p>`;
    } else {
      message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                 <p><code>${account.token}</code></p>`;
    }

    await this.sendEmail({
      to: account.email,
      subject: 'Reset Password',
      html: `<h4>Reset Password Email</h4>
             ${message}`,
    });
  }
  async sendEmail({ to, subject, html, from = 'maimaorg@gmail.com.com' }) {
    mg.messages.create(
      'stetis.com',
      { to, subject, html, from },
      function (error, body) {
        // console.log(body);
      },
    );
  }

  randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
  }
}
