import * as z from "zod";

export const reviewSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  rating: z.number(),
});

export type TReview = z.infer<typeof reviewSchema>;
