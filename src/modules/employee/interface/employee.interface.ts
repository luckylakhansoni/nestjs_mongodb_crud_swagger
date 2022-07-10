import { Document } from "mongoose";

export interface IEmployee extends Document {
  readonly name: string;

  readonly email: string;

  readonly phone: number;

  readonly home_address: string;

  readonly is_delete: boolean;
  readonly date_of_employment: Date;
  readonly dob: Date;

}
