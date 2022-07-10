import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class EmployeeDeleteDto {
  /**
   * Employee Id
   */
  @ApiProperty({
    description: "id",
  })
  @IsNotEmpty()
  id: string;
}
