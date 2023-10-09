"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { colorSchema } from "@/lib/validations"

export async function getColorsByStoreIdAction(storeId: string) {
  const colors = await prisma.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return colors
}

export async function getColorByIdAction(id: string) {
  const size = await prisma.color.findUnique({
    where: {
      id,
    },
  })

  return size
}

export async function addColorAction(
  input: z.infer<typeof colorSchema> & {
    storeId: string
  }
) {
  const { name, value, storeId } = input

  await prisma.color.create({
    data: {
      name,
      value,
      storeId,
    },
  })

  revalidatePath(`/dashboard/stores/${storeId}/colors`)
}

export async function updateColorAction(
  input: z.infer<typeof colorSchema> & {
    id: string
    storeId: string
  }
) {
  const { id, name, value, storeId } = input

  await prisma.color.update({
    where: {
      id,
    },
    data: {
      name,
      value,
      storeId,
    },
  })

  revalidatePath(`/dashboard/stores/${storeId}/colors`)
}

export async function deleteColorsByColorIdsAction(
  sizeIds: string[],
  storeId: string
) {
  try {
    await prisma.color.deleteMany({
      where: {
        storeId,
        id: {
          in: sizeIds,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/colors`)
  } catch (error) {
    throw new Error("Please delete all products using these colors first.")
  }
}
