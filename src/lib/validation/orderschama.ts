import * as z from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(9, { message: "Phone number is required" }),
  message: z.string().optional(),
  community: z.object({
    label: z.string().min(1, { message: "Community is required" }),
    value: z.string(),
  }),
  street: z.string().min(1, { message: "Street is required" }),
  houseNumber: z.string().min(1, { message: "House number is required" }),
  paymentMethod: z.object({
    label: z.string().min(1, { message: "Payment method is required" }),
    value: z.string(),
  }),
  isTakeAway: z.string().optional(),
  isDelivery: z.string().optional(),
  address: z.string().optional(),
  couponCode: z.string().optional(),
  deliveryDate: z.string().optional(),
  time: z.string().optional(),
  date: z.string().optional(),
  companyName: z.string().optional(),
});

export const orderSchemaTakeOff = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(9, { message: "Phone number is required" }),
  message: z.string().optional(),
  community: z
    .object({
      label: z.string().optional(),
      value: z.string().optional(),
    })
    .optional(),
  street: z.string().optional(),
  houseNumber: z.string().optional(),
  paymentMethod: z.object({
    label: z.string().min(1, { message: "Payment method is required" }),
    value: z.string(),
  }),
  isTakeAway: z.string().optional(),
  isDelivery: z.string().optional(),
  address: z.string().optional(),
  couponCode: z.string().optional(),
  deliveryDate: z.string().optional(),
  time: z.string().optional(),
  date: z.string().optional(),
  companyName: z.string().optional(),
});

export type TOrder = z.infer<typeof orderSchema>;
