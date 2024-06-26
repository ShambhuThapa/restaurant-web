
import * as z from "zod";
export const coupanSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    discount:z.string().min(1,{message:"Discount is required"}),
    id:z. string().optional(),


})

export type Tcoupan=z.infer<typeof coupanSchema >;