import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  fullname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  homeaddress: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  emailaddress: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dateofbirth: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(15)
  telephonenumber: string;
}
