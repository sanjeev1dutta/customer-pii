import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerService } from './customers.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard())
export class CustomersController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetUser() user: User,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto, user);
  }

  @Get()
  getCustomers(
    @Query(ValidationPipe) searchDto: SearchCustomerDto,
    @GetUser() user: User,
  ): Promise<Customer[]> {
    if (Object.keys(searchDto).length) {
      return this.customerService.getCustomersWithFilter(searchDto, user);
    } else {
      return this.customerService.getAllCustomers(user);
    }
  }

  @Patch('/:id')
  async updateCustomerUser(
    @Param('id') id: string,
    @Body() updateCustomerUserDto: UpdateCustomerDto,
    @GetUser() user: User,
  ): Promise<Customer> {
    return await this.customerService.updateCustomerUser(
      id,
      updateCustomerUserDto,
      user,
    );
  }

  @Delete('/:id')
  async deleteCustomer(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.customerService.deleteCustomer(id, user);
  }
}
