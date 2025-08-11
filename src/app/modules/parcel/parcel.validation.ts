import { z } from 'zod';

export const createParcelZodSchema = z.object({
  type: z.string(),
  weight: z.number(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  sender: z.string().min(1),
  receiver: z.string().min(1),
  couponCode: z.string().optional(),
});
