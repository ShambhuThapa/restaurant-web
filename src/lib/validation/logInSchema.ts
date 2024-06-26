import *as z from "zod";

export const LogInSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
    
});

export type TLogin = z.infer<typeof LogInSchema>;