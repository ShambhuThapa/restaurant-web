import { z } from "zod";

export const LocationSchema = z.object({
  locationName: z.string().min(1, { message: "Location Name is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  minPrice: z.string().min(1, { message: "Minimum Price is required" }),
  minDeliveryTime: z
    .string()
    .min(1, { message: "Minimum Delivery time is required" }),
  id: z.string().optional(),
});
export type Tlocation = z.infer<typeof LocationSchema>;
