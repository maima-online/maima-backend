import { Column, Model, DataType, Table } from 'sequelize-typescript';

@Table({
  timestamps: false
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  firstName: string;

  @Column
  token: string;

  @Column
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: DataType.ENUM('user', 'admin'), defaultValue: 'user', allowNull: false})
  role: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true, allowNull: true })
  folioNumber: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isVerified: boolean;
}
