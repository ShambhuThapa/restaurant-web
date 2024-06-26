import * as z from "zod";

const MAX_FILE_SIZE = 5000000;

export const blogFormSchema = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`),

  body: z.string().min(50, { message: "There should be minium 50 characters" }),
  id: z.string().optional(),
});

export const blogFormSchemaEdit = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  image: z.any().optional(),
  body: z.string().min(50, { message: "There should be minium 50 characters" }),
  id: z.string().optional(),
});

export type TBlogFormType = z.infer<typeof blogFormSchema>;
