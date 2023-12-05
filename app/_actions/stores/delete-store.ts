"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { prisma } from "@/lib/prismadb"
import {
  DeleteStoreInput,
  DeleteStoreResponse,
  deleteStoreSchema,
} from "@/lib/validations/store"

async function handler({ id }: DeleteStoreInput): Promise<DeleteStoreResponse> {
  const { userId } = auth()

  if (!userId) {
    return {
      error: "Unauthorized",
    }
  }

  try {
    await prisma.store.delete({
      where: {
        userId,
        id,
      },
    })
  } catch (error) {
    return {
      error: "Failed to delete.",
    }
  }

  revalidatePath("/dashboard/stores")
  redirect("/dashboard/stores")
}

export const deleteStore = createSafeAction(deleteStoreSchema, handler)
