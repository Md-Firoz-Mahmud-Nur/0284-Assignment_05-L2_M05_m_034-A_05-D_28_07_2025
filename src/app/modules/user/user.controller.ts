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

export const userControllers = {
  createUser,
  getAllUsers,
  updateUser,
  getAllSender,
};
