import { BaseEntity, Entity, PrimaryColumn, TreeChildren } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class DistributerCustomers extends BaseEntity {
  @PrimaryColumn()
  distributerid: string;

  // @OneToMany(
  //   type => Customer,
  //   customer => customer.id,
  //   { eager: true },
  // )
  @TreeChildren()
  customers: Customer[];
}
