// export class EmployeeEntity {}
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail } from "class-validator";
import { Document } from "mongoose";


@Schema({
  collection: "employee",
})
export class EmployeeEntity {
  @Prop({
    required: true,
    length: 20,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: [isEmail, "invalid email"],
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
    length: 15,
  })
  phone: number;

  @Prop({
    required: true,
    default: false,
  })
  home_address: string;

  @Prop({
    required: true,
    default: false,
  })
  date_of_employment: Date;

  @Prop({
    required: true,
    default: false,
  })
  dob: Date;

  @Prop({
    default: false,
  })
  is_delete: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeEntity);
