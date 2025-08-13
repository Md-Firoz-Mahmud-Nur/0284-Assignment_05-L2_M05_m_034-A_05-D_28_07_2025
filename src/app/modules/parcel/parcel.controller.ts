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

const getAllParcel = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.getAllParcel();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Parcels Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const parcelController = {
  createParcel,
  getAllParcel,
};
