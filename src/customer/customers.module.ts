import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository]), AuthModule],
  controllers: [CustomersController],
  providers: [CustomerService],
})
export class CustomerModule {}
