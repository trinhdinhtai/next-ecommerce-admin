"use server"

import { revalidatePath } from "next/cache"
import { StoredFile } from "@/types"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { billboardSchema } from "@/lib/validations/billboard"

export async function getBillboardsByStoreId(storeId: string) {
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

export async function deleteBillboardByIdsAction(
  billboardIds: string[],
  storeId: string
) {
  await prisma.billboard.deleteMany({
    where: {
      storeId,
      id: {
        in: billboardIds,
      },
    },
  })

  revalidatePath(`/dashboard/stores/${storeId}/billboards`)
}
