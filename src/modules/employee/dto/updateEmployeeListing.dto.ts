import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
// DTO for Update Campaign Listing
export class UpdateEmployeeDto {
  @ApiProperty({
    description: "Name",
  })
  // @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "email",
  })
  email: string;

  @ApiProperty({
    description: "phone number",
  })
  phone: number;

  @ApiProperty({
    description: "Enter your address",
  })
  home_address: string;

  date_of_employment: Date;
  
  dob: Date;
}
