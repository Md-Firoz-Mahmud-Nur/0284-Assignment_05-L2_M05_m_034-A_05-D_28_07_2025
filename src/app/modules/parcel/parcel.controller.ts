import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ParcelService } from "./parcel.service";

const createParcel = catchAsync(async (req: Request, res: Response) => {
  const parcel = await ParcelService.createParcel(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel created Successfully",
    data: parcel,
  });
});

export const parcelController = {
  createParcel,
};
