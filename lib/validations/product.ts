import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Please upload an images")
    .default(null),
  price: z.coerce.number().min(1),
  inventory: z.number(),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isArchived: z.boolean().default(false).optional(),
})
