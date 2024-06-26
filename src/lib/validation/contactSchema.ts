import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  policy: z.boolean().optional(),

});

export type IContact = z.infer<typeof contactSchema>;
