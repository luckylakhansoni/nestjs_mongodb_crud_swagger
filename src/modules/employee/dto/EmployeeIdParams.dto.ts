import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class EmployeeIdParamsDto {
  /**
   * Employee Id
   */
  @ApiProperty({
    description: "id",
  })
  @IsNotEmpty()
  id: string;
}
