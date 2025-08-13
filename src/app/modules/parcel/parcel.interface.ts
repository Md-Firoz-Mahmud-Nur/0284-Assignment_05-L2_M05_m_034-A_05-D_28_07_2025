import { Types } from "mongoose";

export interface IStatusLog {
  _id?: Types.ObjectId;
  status:
    | "Requested"
    | "Approved"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled";
  timestamp: Date;
  updatedBy: Types.ObjectId;
  note?: string;
}

export interface IParcel {
  _id?: Types.ObjectId;
  trackingId: string;
  type: string;
  weight: number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  address: string;
  fee: number;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryDate: Date;
  status:
    | "Requested"
    | "Approved"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled";
  statusLogs: IStatusLog[];
  createdAt?: Date;
  updatedAt?: Date;
}
