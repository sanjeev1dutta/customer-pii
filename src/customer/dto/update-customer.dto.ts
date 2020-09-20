import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCustomerDto {
  // @IsString()
  // @MinLength(36)
  // @MaxLength(36)
  // id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  fullname: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  homeaddress: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  emailaddress: string;

  @IsOptional()
  @IsString()
  dateofbirth: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(15)
  telephonenumber: string;
}
