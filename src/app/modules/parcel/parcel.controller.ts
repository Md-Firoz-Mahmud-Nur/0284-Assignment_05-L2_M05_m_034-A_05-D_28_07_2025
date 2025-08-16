import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IParcel } from "./parcel.interface";
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

const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const decodedToken = req.user;

  const parcel = await ParcelService.getSingleParcel(trackingId, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrieved Successfully",
    data: parcel,
  });
});

const getMyParcel = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;

  const parcel = await ParcelService.getMyParcel(decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrieved Successfully",
    data: parcel,
  });
});

const incomingParcel = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;

  const parcel = await ParcelService.incomingParcel(decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrieved Successfully",
    data: parcel,
  });
});

const updateParcel = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const trackingId = req.params.trackingId;
  const payload = req.body;

  const parcel = await ParcelService.updateParcel(
    trackingId,
    payload as Partial<IParcel>,
    decodedToken
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrieved Successfully",
    data: parcel,
  });
});

export const parcelController = {
  createParcel,
  getAllParcel,
  getSingleParcel,
  getMyParcel,
  incomingParcel,
  updateParcel,
};
