import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  if (rest.role === Role.ADMIN) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot set ADMIN role");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (
    payload?.isBlocked !== undefined ||
    payload?.role !== undefined ||
    payload?.isVerified !== undefined ||
    payload?.isDeleted !== undefined
  ) {
    if (decodedToken.role !== Role.ADMIN) {
      throw new AppError(httpStatus.BAD_REQUEST, "You are not an admin");
    }
  }

  if (payload?.name !== undefined || payload?.picture !== undefined) {
    if (!isUserExist._id.equals(decodedToken.userId)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You can not change others information"
      );
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: { total: totalUsers },
  };
};

const getAllSender = async () => {
  const users = await User.find({ role: Role.SENDER });
  const totalUsers = await User.countDocuments({ role: Role.SENDER });
  return {
    data: users,
    meta: { total: totalUsers },
  };
};

const getAllReceiver = async () => {
  const users = await User.find({ role: Role.RECEIVER });
  const totalUsers = await User.countDocuments({ role: Role.RECEIVER });
  return {
    data: users,
    meta: { total: totalUsers },
  };
};

const getSingleUser = async (decodedToken: JwtPayload, userId: string) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
  }

  const isUserExist = await User.findById(userId).select("-password");

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

const getMe = async (userId: string) => {
  const isUserExist = await User.findById(userId).select("-password");

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

export const userService = {
  createUser,
  getAllUsers,
  updateUser,
  getAllSender,
  getAllReceiver,
  getSingleUser,
  getMe,
};
