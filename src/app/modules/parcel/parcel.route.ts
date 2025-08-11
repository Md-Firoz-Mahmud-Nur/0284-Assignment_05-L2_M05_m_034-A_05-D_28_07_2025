import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { createParcelZodSchema } from "./parcel.validation";
import { parcelController } from "./parcel.controller";

const router = Router();

router.post(
  "/create-parcel",
  checkAuth(Role.SENDER, Role.ADMIN),
  validateRequest(createParcelZodSchema),
  parcelController.createParcel
);

export const ParcelRoutes = router;
