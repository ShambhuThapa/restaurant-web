import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; 

export const DishsSchema = z.object({
  dishTypeId: z.object({
    label: z.string().min(1, { message: "Dish type is required" }),
    value: z.string(),
  }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional().nullable(),
  price: z.string().min(1, { message: "Price is required" }),
  takeAwayDiscount: z
    .string()
    .min(1, { message: "Take away price is required" }),
  vat: z.string().min(1, { message: "Vat is required" }),
  isSupplement: z.boolean().optional(),
  supplement: z.array(z.object({ value: z.string() })),
  takeAway: z.boolean().optional(),
  eatIn: z.boolean().optional(),
  available: z.boolean().optional(),
  deliveryDiscount: z.string().min(1, { message: "Delivery discount is required" }),
  id: z.string().optional(),
  image: z
    .any()
    .optional()
    // .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  
});

export const DishEditSchema = z.object({
  dishTypeId: z.object({
    label: z.string().min(1, { message: "Dish type is required" }),
    value: z.string(),
  }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional().nullable(),
  price: z.string().min(1, { message: "Price is required" }),
  takeAwayDiscount: z
    .string()
    .min(1, { message: "Take away discount is required" }),
  vat: z.string().min(1, { message: "Vat is required" }),
  isSupplement: z.boolean().optional(),
  supplement: z.array(z.object({ value: z.string() })),
  takeAway: z.boolean().optional(),
  eatIn: z.boolean().optional(),
  available: z.boolean().optional(),
  deliveryDiscount: z.string().min(1, { message: "Delivery discount is required" }),
  id: z.string().optional(),
  image: z.any().optional(),
});

export type TDish = z.infer<typeof DishsSchema>;
