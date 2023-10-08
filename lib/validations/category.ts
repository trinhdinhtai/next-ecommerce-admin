import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(2),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Please upload an image")
    .default(null),
  billboardId: z.string(),
})
