import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    user: User,
  ): Promise<Customer> {
    const {
      id,
      fullname,
      homeaddress,
      emailaddress,
      dateofbirth,
      telephonenumber,
      distributorid,
    } = createCustomerDto;

    const customer = new Customer();
    customer.id = id;
    customer.fullname = fullname;
    customer.homeaddress = homeaddress;
    customer.emailaddress = emailaddress;
    customer.dateofbirth = dateofbirth;
    customer.telephonenumber = telephonenumber;
    customer.distributorid = distributorid; //user.id;

    try {
      await customer.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Customer already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
    return customer;
  }

  async getCustomerById(id: string, user: User): Promise<Customer> {
    const found = await this.findOne({
      where: {
        id: id,
        distributorid: user.id,
      },
    });

    if (!found)
      throw new NotFoundException(`Customer with Id "${id}" not found`);

    return found;
  }

  async getAllCustomers(user: User): Promise<Customer[]> {
    return await this.find({ distributorid: user.id });
  }

  async getCustomersWithFilter(
    searchDto: SearchCustomerDto,
    user: User,
  ): Promise<Customer[]> {
    const { search } = searchDto;

    const found = await this.find({
      where: {
        $or: [{ fullname: search }, { emailaddress: search }],
        distributorid: user.id,
      },
    });

    if (!found || found.length <= 0) {
      throw new NotFoundException(`Customer Not Found`);
    }

    return found;
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    user: User,
  ): Promise<Customer> {
    await this.update(
      {
        id,
        distributorid: user.id,
      },
      {
        fullname: updateCustomerDto.fullname,
        homeaddress: updateCustomerDto.homeaddress,
        emailaddress: updateCustomerDto.emailaddress,
        dateofbirth: updateCustomerDto.dateofbirth,
        telephonenumber: updateCustomerDto.telephonenumber,
        distributorid: user.id,
      },
    );
    return await this.getCustomerById(id, user);
  }

  async deleteCustomer(id: string, user: User): Promise<void> {
    await this.getCustomerById(id, user);
    await this.delete({
      id,
      distributorid: user.id,
    });
    return;
  }
}
