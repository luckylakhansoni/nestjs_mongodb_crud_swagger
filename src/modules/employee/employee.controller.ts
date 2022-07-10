import {
  Controller,
  Delete,
  HttpCode,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  Body,
  Get,
  HttpStatus,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Messages } from "helper/constant/message";
import { EmployeeService } from "./employee.service";
import { AddEmployee } from "./dto/addEmployee.dto";
import { GetEmployeeListDto } from "./dto/getEmployeeListing.dto";
import { EmployeeIdParamsDto } from "./dto/EmployeeIdParams.dto";
import { EmployeeDeleteDto } from "./dto/deleteEmployeeListDto";
import { EmployeeEntity } from "./employee.entity";
import { UpdateEmployeeDto } from "./dto/updateEmployeeListing.dto";

@ApiTags("employee")
@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post("/")
  @ApiResponse({ status: HttpStatus.OK, description: "Record created" })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  addCampaignListing(@Body() addEmployee: AddEmployee): Promise<any> {
    return this.employeeService.createStudent(addEmployee);
  }

  @Get("/")
  @ApiResponse({ status: HttpStatus.OK, description: "Data received" })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  getEmployees(
    @Query() getEmployeeListDto: GetEmployeeListDto
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.getAllEmployees(getEmployeeListDto);
  }

  @Get("/:id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: Messages.DATA_RECEIVED,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Data not found",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  getDataFromId(@Param() id: EmployeeIdParamsDto): Promise<object> {
    return this.employeeService.getEmployeeById(id.id);
  }

  @Put("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "updated",
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Data not found",
  })
  editCampaignListing(
    @Param() id: EmployeeIdParamsDto,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<any> {
    return this.employeeService.updateEmployee(updateEmployeeDto, id.id);
  }

  @Delete("/delete/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Deleted",
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Data not found",
  })
  async deleteCampaign(@Param() id: EmployeeDeleteDto): Promise<object> {
    return await this.employeeService.SoftDelete(id.id);
  }

  @Get("/deleted")
  @ApiResponse({ status: HttpStatus.OK, description: "Data received" })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  getDeletedEmployees(
    @Query() getEmployeeListDto: GetEmployeeListDto
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.getAllDeletedEmployees(getEmployeeListDto);
  }
}
