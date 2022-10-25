import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    BelongsTo,
    Model,
    Table,
  } from 'sequelize-typescript';
//   import { BrandCategory } from './BrandCategory';
  import { User } from '../../accounts/models/User.model';
  import { Product } from './Product.model';
  
  @Table({
    timestamps: false
  })
  
  export class Rating extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    id: string;
  
    @Column({ allowNull: false })
    rating: number;

    @Column
    comment: string;

    @Column({ allowNull: false })
    submitted: Date;

    @BelongsTo(() => User, 'userId')
    user: User;
    
    @BelongsTo(() => Product, 'productId')
    product: Product;
  }

//   rid VARCHAR(12) NOT NULL PRIMARY KEY,
//   pid VARCHAR(11) REFERENCES products(pid),
//   userid VARCHAR(11) REFERENCES users(userid),
//   rating_number INT NOT NULL,
//   comment VARCHAR(300) NOT NULL,
//   submitted TIMESTAMP NOT NULL