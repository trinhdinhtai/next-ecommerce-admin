import { z } from "zod"

export const createStoreSchema = z.object({
  name: z.string().min(1),
})

export const categorySchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().url().nonempty("Please upload an image"),
  billboardId: z.string(),
})

export const billboardSchema = z.object({
  imageUrl: z.string().url().nonempty(),
  label: z.string().min(1),
})

export const colorSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "Please fill in the correct color code format",
  }),
})

export const sizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(0),
})
