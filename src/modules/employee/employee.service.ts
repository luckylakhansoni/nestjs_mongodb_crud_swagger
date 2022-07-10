import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { AddEmployee } from "./dto/addEmployee.dto";
import { GetEmployeeListDto } from "./dto/getEmployeeListing.dto";
import { IEmployee } from "../employee/interface/employee.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateEmployeeDto } from "./dto/updateEmployeeListing.dto";
import { response } from "express";
import m from "mongoose";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel("Employee") private EmployeeSchema: Model<IEmployee>
  ) {}

  async createStudent(addEmployee: AddEmployee): Promise<IEmployee> {
    // try {
    // findOne
    const EmpExists = await this.EmployeeSchema.findOne({
      $or: [
        {
          email: addEmployee.email,
        },
        {
          phone: addEmployee.phone,
        },
      ],
    });
    if (EmpExists && EmpExists.email === addEmployee.email) {
      throw new NotFoundException("Email id already exists!");
    }
    if (EmpExists && EmpExists.phone === addEmployee.phone) {
      throw new NotFoundException("phone number already exists!");
    }
    const newEmployee = await new this.EmployeeSchema(addEmployee);
    return newEmployee.save();
  }
  async getAllEmployees(
    getEmployeeListDto: GetEmployeeListDto
  ): Promise<IEmployee[]> {
    const EmployeeData = await this.EmployeeSchema.find({ is_delete: false })
      .skip(getEmployeeListDto.page)
      .limit(getEmployeeListDto.limit);
    if (!EmployeeData || EmployeeData.length == 0) {
      throw new NotFoundException("Employees data not found!");
    }
    return EmployeeData;
  }

  async getEmployeeById(id: string): Promise<IEmployee> {
    const existingEmployee = await this.EmployeeSchema.findOne({
      _id: id,
      is_delete: false,
    });
    if (existingEmployee) {
      return existingEmployee;
    } else {
      throw new NotFoundException(`employee #${id} not found`);
    }
  }
  async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
    id: string
  ): Promise<any> {
    const user = await this.EmployeeSchema.findOne({
      _id: id,
      is_delete: false,
    });
    if (!user) {
      throw new NotFoundException("Employee not foud with entered id!");
    }
    const existingEmployee = await this.EmployeeSchema.updateOne(
      { _id: id },
      { $set: updateEmployeeDto }
    );
    return existingEmployee;
  }

  async SoftDelete(id: string): Promise<any> {
    const user = await this.EmployeeSchema.findOne({
      _id: id,
      is_delete: false,
    });
    if (!user) {
      throw new NotFoundException("Employee not foud with entered id!");
    }
    const existingEmployee = await this.EmployeeSchema.updateOne(
      { _id: id },
      { is_delete: true }
    );
    return existingEmployee;
  }

  async getAllDeletedEmployees(
    getEmployeeListDto: GetEmployeeListDto
  ): Promise<IEmployee[]> {
    const EmployeeData = await this.EmployeeSchema.find({ is_delete: true })
      .skip(getEmployeeListDto.page)
      .limit(getEmployeeListDto.limit);
    if (!EmployeeData || EmployeeData.length == 0) {
      throw new NotFoundException("Deleted Employees data not found!");
    }
    return EmployeeData;
  }
}
