import { z } from "zod";

export const createParcelZodSchema = z.object({
  type: z.string({
    error: (err) => {
      if (err.code === "invalid_type") {
        return "Type must be a string";
      }
    },
  }),
  weight: z.number({
    error: (err) => {
      if (err.code === "invalid_type") {
        return "Weight must be a number";
      }
    },
  }),
  pickupAddress: z
    .string({
      error: (err) => {
        if (err.code === "invalid_type") {
          return "Pickup address must be a string";
        }
      },
    })
    .min(4, {
      message: "Pickup address must be at least 4 characters long.",
    })
    .max(100, { message: "Pickup address cannot exceed 100 characters." }),
  deliveryAddress: z
    .string({
      error: "Delivery address is required as string",
    })
    .min(4, {
      message: "Delivery address must be at least 4 characters long.",
    })
    .max(100, { message: "Delivery address cannot exceed 100 characters." }),
  sender: z
    .string({
      error: (err) => {
        if (err.code === "invalid_type") {
          return "Sender must be a string";
        }
      },
    })
    .min(1),
  receiver: z
    .string({
      error: (err) => {
        if (err.code === "invalid_type") {
          return "Receiver must be a string";
        }
      },
    })
    .min(1),
  couponCode: z.string().optional(),
});

export const updateParcelZodSchema = z
  .object({
    pickupAddress: z
      .string({
        error: (err) => {
          if (err.code === "invalid_type") {
            return "Pickup address must be a string";
          }
        },
      })
      .min(4, {
        message: "Pickup address must be at least 4 characters long.",
      })
      .max(100, { message: "Pickup address cannot exceed 100 characters." })
      .optional(),
    deliveryAddress: z
      .string({
        error: "Delivery address is required as string",
      })
      .min(4, {
        message: "Delivery address must be at least 4 characters long.",
      })
      .max(100, { message: "Delivery address cannot exceed 100 characters." })
      .optional(),
    weight: z
      .number({
        error: (err) => {
          if (err.code === "invalid_type") {
            return "Weight must be a number";
          }
        },
      })
      .optional(),
    status: z
      .enum(
        [
          "Requested",
          "Approved",
          "Dispatched",
          "In Transit",
          "Delivered",
          "Cancelled",
        ],
        {
          error: (err) => {
            if (err.code === "invalid_value") {
              return "Enter correct status";
            }
          },
        }
      )
      .optional(),
  })
  .strict();
