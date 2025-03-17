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

export interface RentalMobilModel {
  _id: ObjectId;
  car_model: string;
  transmission: string;
  capacity: number;
  bags: number;
  price_per_day: number;
  location: string;
  is_available: boolean;
  available_date: string;
  start_time: string;
  finish_date: string;
  end_time: string;
  is_with_driver: boolean;
  image_car: string;
}
