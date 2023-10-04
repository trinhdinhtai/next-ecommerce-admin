import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1),
  images: z
    .object({ url: z.string() })
    .array()
    .nonempty("Please add at least one image or update the existing one"),
  price: z.coerce.number().min(1),
  inventory: z.number(),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
