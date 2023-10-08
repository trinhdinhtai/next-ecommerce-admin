"use server"

import { revalidatePath } from "next/cache"
import { StoredFile } from "@/types"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { billboardSchema } from "@/lib/validations/billboard"

export async function getBillboardsByStoreIdAction(storeId: string) {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return billboards
}

export async function addBillboardAction(
  input: z.infer<typeof billboardSchema> & {
    storeId: string
    images: StoredFile[] | null
  }
) {
  await prisma.billboard.create({
    data: {
      storeId: input.storeId,
      label: input.label,
      imageUrl: input.images?.[0].url!,
    },
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/billboards`)
}

export async function updateBillboardAction(
  input: z.infer<typeof billboardSchema> & {
    id: string
    storeId: string
    images: StoredFile[] | null
  }
) {
  await prisma.billboard.update({
    where: {
      id: input.id,
    },
    data: {
      storeId: input.storeId,
      label: input.label,
      imageUrl: input.images?.[0].url!,
    },
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/billboards`)
}

export async function deleteBillboardByIdsAction(
  billboardIds: string[],
  storeId: string
) {
  try {
    await prisma.billboard.deleteMany({
      where: {
        storeId,
        id: {
          in: billboardIds,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/billboards`)
  } catch (error) {
    throw new Error("Product not found.")
  }
}
