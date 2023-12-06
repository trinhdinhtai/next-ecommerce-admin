"use server"

import { revalidatePath } from "next/cache"
import { FREE_PLAN_MAX_STORES } from "@/constants/store"
import { getI18n } from "@/i18n/server"
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
  const t = await getI18n()
  const { userId } = auth()

  if (!userId) {
    return {
      error: "Unauthorized",
    }
  }

  try {
    const [storeWithSameName, userStoresCount] = await Promise.all([
      prisma.store.findFirst({
        where: {
          name,
        },
      }),
      prisma.store.count({
        where: {
          userId,
        },
      }),
    ])

    if (storeWithSameName) {
      throw new Error(t("toast.errors.sameName"))
    }

    const userPlan = await prisma.userPlan.findFirst({
      where: {
        userId,
      },
      include: {
        plan: true,
      },
    })

    const maxStores = userPlan?.plan?.maxStores ?? FREE_PLAN_MAX_STORES

    if (userStoresCount >= maxStores)
      throw new Error(t("toast.errors.maxStores"))

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
        error: t("toast.errors.description"),
      }
    }
  }
}

export const createStore = createSafeAction(storeSchema, handler)
