import { ObjectId } from "mongodb";

export interface UserModel {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
