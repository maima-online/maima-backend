import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
  } from 'sequelize-typescript';
//   import { Product } from 'src/products/models/Product.model';
  import { User } from '../../accounts/models/User.model';
  
  @Table({
    timestamps: false
  })
  export class Address extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column
    address: string;

    @Column
    city: string;

    @Column
    firstName: string;

    @Column
    lastName: string;
    // @Column
    // postal_code: string;

    // @Column
    // country: string;

    @Column
    phone: string;

    @BelongsTo(() => User, 'userId')
    user: User;
  
  }
