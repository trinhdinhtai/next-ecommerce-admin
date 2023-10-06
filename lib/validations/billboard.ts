import { z } from "zod"

export const billboardSchema = z.object({
  label: z.string().min(1),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Please upload an images")
    .default(null),
})
