import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { parcelController } from "./parcel.controller";
import { createParcelZodSchema } from "./parcel.validation";

const router = Router();

router.post(
  "/create-parcel",
  checkAuth(Role.SENDER, Role.ADMIN),
  validateRequest(createParcelZodSchema),
  parcelController.createParcel
);

router.get("/all-parcel", checkAuth(Role.ADMIN), parcelController.getAllParcel);

router.get("/mine", checkAuth(Role.SENDER), parcelController.getMyParcel);

router.get("/incoming", checkAuth(Role.RECEIVER), parcelController.incomingParcel);

router.get(
  "/:trackingId",
  checkAuth(...Object.values(Role)),
  parcelController.getSingleParcel
);

export const ParcelRoutes = router;
