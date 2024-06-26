import { string, z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 3;

export const PopsUp = z.object({
  mobileViewImage: z
    .any()
    .optional()
    .refine((file) => file?.length == 1, "Image is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, `Max file is 3MB.`),

  webViewImage: z
    .any()
    .optional()
    .refine((file) => file?.length == 1, "Image is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, `Max file is 3MB.`),

  id: string().optional(),
});

export const PopsUpEdit = z.object({
  webViewImage: z.any().optional(),
  mobileViewImage: z.any().optional(),

  id: string().optional(),
});

export type TPopUP = z.infer<typeof PopsUp>;
