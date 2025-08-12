import { Types } from "mongoose";

export interface IParcel {
  _id?: Types.ObjectId;
  trackingId: string;
  type: string;
  weight: number;
  sender: string;
  receiver: string;
  address: string;
  fee: number;
  deliveryDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
