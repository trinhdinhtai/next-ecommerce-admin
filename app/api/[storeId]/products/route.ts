import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import { toTitleCase } from "@/lib/utils"

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)

    const categoriesParam = searchParams.get("categories")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    const categories = categoriesParam
      ?.split(".")
      .map((item) => toTitleCase(item))

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const response = await Promise.all([
      prisma.product.count({
        where: {
          storeId: params.storeId,
          isArchived: false,
          category: {
            name: {
              in: categories,
            },
          },
        },
      }),
      await prisma.product.findMany({
        skip: offset ? parseInt(offset) : undefined,
        take: limit ? parseInt(limit) : undefined,
        where: {
          storeId: params.storeId,
          isArchived: false,
          category: {
            name: {
              in: categories ?? undefined,
            },
          },
        },
        include: {
          images: true,
          category: true,
          color: true,
          size: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ])

    const [count, products] = response

    return NextResponse.json({ count, products })
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 })
    }

    const body = await req.json()
    const {
      name,
      price,
      inventory,
      categoryId,
      colorId,
      sizeId,
      images,
      isArchived,
    } = body

    if (!name?.length) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!Array.isArray(images)) {
      return new NextResponse("Invalid images", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 })
    }

    if (!inventory) {
      return new NextResponse("Inventory is required", { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        inventory,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: any) => ({
              url: image.url,
            })),
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
