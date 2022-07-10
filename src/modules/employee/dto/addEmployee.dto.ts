import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";
export class AddEmployee {
  @ApiProperty({
    description: "Name",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Enter phone number",
  })
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    description: "Home address",
  })
  @IsNotEmpty()
  @IsString()
  home_address: string;

  @ApiProperty({
    description: "Home address",
  })
  @IsNotEmpty()
  date_of_employment: Date;

  @ApiProperty({
    description: "Home address",
  })
  @IsNotEmpty()
  dob: Date;
}
