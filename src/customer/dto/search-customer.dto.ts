import { ApiProperty } from '@nestjs/swagger';

export class SearchCustomerDto {
  // fullname: string;
  // emailaddress: string;

  @ApiProperty()
  search: string;
}
