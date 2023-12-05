"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { prisma } from "@/lib/prismadb"
import {
  StoreFormValues,
  StoreResponse,
  storeSchema,
} from "@/lib/validations/store"

async function handler({
  name,
  description,
}: StoreFormValues): Promise<StoreResponse> {
  const { userId } = auth()

  if (!userId) {
    return {
      error: "Unauthorized",
    }
  }

  try {
    const storeWithSameName = await prisma.store.findFirst({
      where: {
        name,
      },
    })

    if (storeWithSameName) {
      throw new Error("A store with the same name already exists.")
    }

    const store = await prisma.store.create({
      data: {
        userId,
        name,
        description,
      },
    })

    revalidatePath("/dashboard/stores")

    return {
      data: store,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      }
    } else {
      return {
        error: "Something went wrong, please try again.",
      }
    }
  }
}

export const createStore = createSafeAction(storeSchema, handler)
