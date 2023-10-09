"use server"

import { revalidatePath } from "next/cache"
import { StoredFile } from "@/types"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { productSchema } from "@/lib/validations/product"

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  })

  return product
}

export async function getProductByStoreIdAction(storeId: string) {
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
}

export async function addProductAction(
  input: z.infer<typeof productSchema> & {
    storeId: string
    images: StoredFile[] | null
  }
) {
  const {
    name,
    price,
    inventory,
    categoryId,
    colorId,
    sizeId,
    images,
    isArchived,
    storeId,
  } = input

  const product = await prisma.product.create({
    data: {
      name,
      price,
      inventory,
      isArchived,
      categoryId,
      colorId,
      sizeId,
      storeId,
    },
  })

  if (images?.length) {
    await prisma.image.createMany({
      data: images.map((image) => ({
        url: image.url,
        productId: product.id,
      })),
    })
  }

  revalidatePath(`/dashboard/stores/${storeId}/products`)
}

export async function updateProductAction(
  input: z.infer<typeof productSchema> & {
    id: string
    storeId: string
    images: StoredFile[] | null
  }
) {
  const {
    id,
    name,
    price,
    inventory,
    categoryId,
    colorId,
    sizeId,
    images,
    isArchived,
    storeId,
  } = input

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      inventory,
      isArchived,
      categoryId,
      colorId,
      sizeId,
      storeId,
    },
  })

  await prisma.image.deleteMany({
    where: {
      productId: id,
    },
  })

  if (images?.length) {
    await prisma.image.createMany({
      data: images.map((image) => ({
        url: image.url,
        productId: product.id,
      })),
    })
  }

  revalidatePath(`/dashboard/stores/${storeId}/products`)
}

export async function deleteProductsByProductIdsAction(
  productIds: string[],
  storeId: string
) {
  try {
    await prisma.product.deleteMany({
      where: {
        storeId,
        id: {
          in: productIds,
        },
      },
    })
    revalidatePath(`/dashboard/stores/${storeId}/products`)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}
