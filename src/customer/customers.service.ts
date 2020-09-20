import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerRepository } from './customer.repository';
import { User } from '../auth/user.entity';
import { Injectable } from '@nestjs/common';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    user: User,
  ): Promise<Customer> {
    return await this.customerRepository.createCustomer(
      createCustomerDto,
      user,
    );
  }

  async getAllCustomers(user: User): Promise<Customer[]> {
    return await this.customerRepository.getAllCustomers(user);
  }

  async getCustomersWithFilter(
    searchDto: SearchCustomerDto,
    user: User,
  ): Promise<Customer[]> {
    return await this.customerRepository.getCustomersWithFilter(
      searchDto,
      user,
    );
  }

  async updateCustomerUser(
    id: string,
    updateCustomerUserDto: UpdateCustomerDto,
    user: User,
  ): Promise<Customer> {
    return await this.customerRepository.updateCustomer(
      id,
      updateCustomerUserDto,
      user,
    );
  }

  async deleteCustomer(id: string, user: User): Promise<void> {
    return await this.customerRepository.deleteCustomer(id, user);
  }
}
