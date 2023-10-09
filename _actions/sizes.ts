"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { sizeSchema } from "@/lib/validations"

export async function getSizesByStoreIdAction(storeId: string) {
  const sizes = await prisma.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return sizes
}

export async function getSizeByIdAction(id: string) {
  const size = await prisma.size.findUnique({
    where: {
      id,
    },
  })

  return size
}

export async function addSizeAction(
  input: z.infer<typeof sizeSchema> & {
    storeId: string
  }
) {
  const { name, value, storeId } = input

  await prisma.size.create({
    data: {
      name,
      value,
      storeId,
    },
  })

  revalidatePath(`/dashboard/stores/${storeId}/sizes`)
}

export async function updateSizeAction(
  input: z.infer<typeof sizeSchema> & {
    id: string
    storeId: string
  }
) {
  const { id, name, value, storeId } = input

  await prisma.size.update({
    where: {
      id,
    },
    data: {
      name,
      value,
      storeId,
    },
  })

  revalidatePath(`/dashboard/stores/${storeId}/sizes`)
}

export async function deleteSizesBySizeIdsAction(
  sizeIds: string[],
  storeId: string
) {
  try {
    await prisma.size.deleteMany({
      where: {
        storeId,
        id: {
          in: sizeIds,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/sizes`)
  } catch (error) {
    throw new Error("Please delete all products using these sizes first.")
  }
}
