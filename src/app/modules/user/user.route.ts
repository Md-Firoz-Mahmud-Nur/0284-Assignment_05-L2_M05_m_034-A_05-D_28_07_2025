import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { Role } from "./user.interface";
import { createZodSchema, updateUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createZodSchema),
  userControllers.createUser
);
router.get("/all-users", checkAuth(Role.ADMIN), userControllers.getAllUsers);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userControllers.updateUser
);
router.get("/all-sender", checkAuth(Role.ADMIN), userControllers.getAllSender);
router.get(
  "/all-receiver",
  checkAuth(Role.ADMIN),
  userControllers.getAllReceiver
);
router.get("/me", checkAuth(...Object.values(Role)), userControllers.getMe);
router.get("/:id", checkAuth(Role.ADMIN), userControllers.getSingleUser);

export const userRoutes = router;
