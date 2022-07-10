import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeModule } from "./modules/employee/employee.module";
import { EmployeeService } from "./modules/employee/employee.service";
import { EmployeeSchema } from "./modules/employee/employee.entity";

import { EmployeeController } from "./modules/employee/employee.controller";
import configuration from "config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forFeature([{ name: "Employee", schema: EmployeeSchema }]),

    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),

    EmployeeModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class AppModule {}
