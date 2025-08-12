import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { IParcel } from "./parcel.interface";

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


  console.log("decodedToken", decodedToken);
  console.log("create parcel hit \n");
  console.log(payload);
};

export const ParcelService = { createParcel };
