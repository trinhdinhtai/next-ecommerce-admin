import * as z from "zod"

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
})

export const getStoresSchema = z.object({
  userId: z.string().optional(),
})
