import { ApiPropertyOptional } from "@nestjs/swagger";
import { ToNumber } from "../../../helper/transform/type.transform";
export class GetEmployeeListDto {
  @ApiPropertyOptional({
    description: "Page Number",
  })
  @ToNumber()
  page: number;
  /**
   * Page Limit
   */
  @ApiPropertyOptional({
    description: "Page Limit",
  })
  @ToNumber()
  limit: number;
}
