import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  id: string;

  fullname: string;

  // @IsNotEmpty()
  homeaddress: string;

  @IsNotEmpty()
  emailaddress: string;

  @IsOptional()
  dateofbirth: string;

  @IsOptional()
  telephonenumber: string;

  @IsNotEmpty()
  distributorid: string;
}
