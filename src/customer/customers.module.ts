import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
// import { User } from 'src/auth/user.entity';
// import { Customer } from './customer.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://localhost/carrental',
    //   synchronize: true,
    //   useUnifiedTopology: true, //mongodb specific - purpose not clear, perhaps to be used to handle some depreciation in future
    //   entities: [Customer, User],
    // }),
    TypeOrmModule.forFeature([CustomerRepository]),
    AuthModule,
  ],
  controllers: [CustomersController],
  providers: [CustomerService],
})
export class CustomerModule {}
