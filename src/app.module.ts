import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customers.module';
import { Customer } from './customer/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/carrental1',
      synchronize: true,
      useUnifiedTopology: true, //mongodb specific - purpose not clear, perhaps to be used to handle some depreciation in future
      entities: [Customer, User],
    }),
    CustomerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
