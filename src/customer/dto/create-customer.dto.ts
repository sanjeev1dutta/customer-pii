import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  homeaddress: string;

  @ApiProperty()
  @IsNotEmpty()
  emailaddress: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateofbirth: string;

  @ApiProperty({ required: false })
  @IsOptional()
  telephonenumber: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // distributorid: string;
}
