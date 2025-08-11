import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  const userTokens = createUserTokens(user);

  setAuthCookie(res, userTokens);

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: {
      user: userWithoutPassword,
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
    },
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const verifiedToken = req.user as JwtPayload;

  const payload = req.body;

  const user = await userService.updateUser(userId, payload, verifiedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllSender = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getAllSender();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sender Retrieved Successfully",
    data,
  });
});

const getAllReceiver = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getAllReceiver();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Receiver Retrieved Successfully",
    data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const userId = req.params.id;

  const user = await userService.getSingleUser(decodedToken, userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully",
    data: user,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const user = await userService.getMe(decodedToken.userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully",
    data: user,
  });
});

export const userControllers = {
  createUser,
  getAllUsers,
  updateUser,
  getAllSender,
  getAllReceiver,
  getSingleUser,
  getMe,
};
