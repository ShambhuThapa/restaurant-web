import { string } from "zod";
import * as z from "zod";

export const DishTypeSchema = z.object({
  name: string().min(1, { message: "Name is required" }),
  description: string().optional(),
  id: string().optional(),
});

export type TDishType = z.infer<typeof DishTypeSchema>;
