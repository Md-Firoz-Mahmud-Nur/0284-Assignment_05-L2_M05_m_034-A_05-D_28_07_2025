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

const getSingleParcel = async (
  trackingId: string,
  decodedToken: JwtPayload
) => {
  const parcel = await Parcel.findOne({ trackingId });

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
  }

  if (decodedToken.role === Role.SENDER) {
    if (parcel.sender.toString() !== decodedToken.userId) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can see only your parcel"
      );
    }
  }

  if (decodedToken.role === Role.RECEIVER) {
    if (parcel.receiver.toString() !== decodedToken.userId) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can see only your parcel"
      );
    }
  }

  return parcel;
};

const getMyParcel = async (decodedToken: JwtPayload) => {
  const parcel = await Parcel.find({ sender: decodedToken.userId });
  return {
    data: parcel,
    meta: {
      total: parcel.length,
    },
  };
};

const incomingParcel = async (decodedToken: JwtPayload) => {
  const parcel = await Parcel.find({ receiver: decodedToken.userId });
  return {
    data: parcel,
    meta: {
      total: parcel.length,
    },
  };
};

const updateParcel = async (
  trackingId: string,
  payload: Partial<IParcel>,
  decodedToken: JwtPayload
) => {
  const isParcelExits = await Parcel.findOne({ trackingId });

  if (!isParcelExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
  }

  if (decodedToken.role === Role.SENDER) {
    if (isParcelExits.sender.toString() !== decodedToken.userId) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can update only your parcel"
      );
    }

    if (isParcelExits.status !== "Requested") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Can not update Parcel after approved"
      );
    }

    if (payload.status !== "Cancelled") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not set ${payload.status}`
      );
    }
  }

  if (decodedToken.role === Role.RECEIVER) {
    if (isParcelExits.receiver.toString() !== decodedToken.userId) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can update only your parcel"
      );
    }

    if (isParcelExits.status !== "In Transit") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You can only update Parcel to Delivered after In Transit"
      );
    }
  }

  const parcel = await Parcel.findOneAndUpdate({ trackingId }, payload, {
    new: true,
    runValidators: true,
  });

  return parcel;
};

export const ParcelService = {
  createParcel,
  getAllParcel,
  getSingleParcel,
  getMyParcel,
  incomingParcel,
  updateParcel,
};
