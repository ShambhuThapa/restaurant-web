import { z } from "zod";

export const WebSiteInfoSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "email is required" }),
  timeZone: z.string().optional(),
  postalCode: z.string(),
  houseNumber: z.string().min(1, { message: "House Number is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  description: z.string().min(1, { message: "Description is required" }),

  facebook: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  pinterest: z.string().optional(),
  twitter: z.string().optional(),
});
export type TwebSiteInfo = z.infer<typeof WebSiteInfoSchema>;
