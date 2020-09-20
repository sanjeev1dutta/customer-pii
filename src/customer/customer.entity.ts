import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Customer extends BaseEntity {
  @ObjectIdColumn()
  _id: string; //mongodb specific

  @PrimaryColumn()
  //is auumed to received from ditributer platform side,
  //when creating booking on customer's behalf
  id: string;

  @Column()
  fullname: string;

  @Column()
  homeaddress: string;

  @Column()
  emailaddress: string;

  @Column()
  dateofbirth: string;

  @Column()
  telephonenumber: string;

  @Column()
  distributorid: string;
}
