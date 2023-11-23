"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { z } from "zod"

import { createSafeAction } from "@/lib/create-safe-action"
import { prisma } from "@/lib/prismadb"
import {
  DeleteStoreInput,
  DeleteStoreResponse,
  deleteStoreSchema,
  getStoresSchema,
} from "@/lib/validations/store"

export async function getStoresAction({
  userId,
}: z.infer<typeof getStoresSchema>) {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return stores
}

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
