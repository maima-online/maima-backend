import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}
  getHello(): string {
    return 'Hello World!';
  }

  editFileName(req, file, cb) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${fileExtName}`);
  }
}
