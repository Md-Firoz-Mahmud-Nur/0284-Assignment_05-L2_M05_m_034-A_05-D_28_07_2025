import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { generateTrackingId } from "../../utils/getTrackingId";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { IParcel } from "./parcel.interface";
import { Parcel } from "./parcel.model";

const createParcel = async (
  payload: Partial<IParcel>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.userId !== payload.sender) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const isUserExist = await User.findById(payload.sender);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (isUserExist.role !== Role.SENDER) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not a sender");
  }

  const isUserReceiverExist = await User.findById(payload.receiver);

  if (!isUserReceiverExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Receiver not found");
  }

  if (isUserReceiverExist.role !== Role.RECEIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, "Enter user with receiver role");
  }

  const date = new Date();
  date.setDate(date.getDate() + 3);
  payload.deliveryDate = date;

  payload.status = "Requested";

  payload.trackingId = await generateTrackingId();

  payload.fee = 170;

  const parcel = await Parcel.create(payload);
  return parcel;
};

const getAllParcel = async () => {
  const parcels = await Parcel.find({});
  return {
    data: parcels,
    meta: {
      total: parcels.length,
    },
  };
};

const getSingleParcel = async (trackingId: string) => {
  const parcel = await Parcel.findOne({ trackingId });
  return parcel;
};

export const ParcelService = { createParcel, getAllParcel, getSingleParcel };
