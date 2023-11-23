import { Store } from "@prisma/client"
import * as z from "zod"

import { ActionState } from "@/lib/create-safe-action"

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
})

export const getStoresSchema = z.object({
  userId: z.string().optional(),
})

export const deleteStoreSchema = z.object({
  id: z.string(),
})

export type DeleteStoreInput = z.infer<typeof deleteStoreSchema>
export type DeleteStoreResponse = ActionState<DeleteStoreInput, Store>
