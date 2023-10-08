"use server"

import { revalidatePath } from "next/cache"
import { StoredFile } from "@/types"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { categorySchema } from "@/lib/validations/category"

export async function getCategoriesByStoreIdAction(storeId: string) {
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: {
        select: {
          id: true,
          label: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return categories
}

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

export async function addCategoryAction(
  input: z.infer<typeof categorySchema> & {
    storeId: string
    images: StoredFile[] | null
  }
) {
  await prisma.category.create({
    data: {
      storeId: input.storeId,
      name: input.name,
      imageUrl: input.images?.[0].url!,
      billboardId: input.billboardId,
    },
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/categories`)
}

export async function updateCategoryAction(
  input: z.infer<typeof categorySchema> & {
    id: string
    storeId: string
    images: StoredFile[] | null
  }
) {
  await prisma.category.update({
    where: {
      id: input.id,
    },
    data: {
      storeId: input.storeId,
      name: input.name,
      imageUrl: input.images?.[0].url!,
      billboardId: input.billboardId,
    },
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/categories`)
}

export async function deleteCategoriesByIdsAction(
  categoryIds: string[],
  storeId: string
) {
  try {
    await prisma.category.deleteMany({
      where: {
        storeId,
        id: {
          in: categoryIds,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/categories`)
  } catch (error) {
    throw new Error("Please delete all products in these category first.")
  }
}
