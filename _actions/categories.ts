"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prismadb"

export async function getCategoriesByStoreId(storeId: string) {
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
  })
  return categories
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  })
  return category
}

export async function deleteCategoriesByIdsAction(
  categories: string[],
  storeId: string
) {
  try {
    await prisma.category.deleteMany({
      where: {
        storeId,
        id: {
          in: categories,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/billboards`)
  } catch (error) {
    throw new Error("Please delete all products in these category first.")
  }
}
