import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  picture?: string;
  auths: IAuthProvider[];
  isDeleted?: boolean;
  isBlocked?: boolean;
  isVerified?: boolean;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
