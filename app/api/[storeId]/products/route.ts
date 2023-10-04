import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import { productSchema } from "@/lib/validations/product"

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)

    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    let isFeaturedValue
    if (isFeatured === "true") {
      isFeaturedValue = true
    } else if (isFeatured === "false") {
      isFeaturedValue = false
    } else {
      isFeaturedValue = undefined
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeaturedValue,
        isArchived: false,
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
    })

    return NextResponse.json(products)
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
      isFeatured,
      isArchived,
    } = productSchema.parse(body)

    if (!name?.length) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!images?.length) {
      return new NextResponse("Images are required", { status: 400 })
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
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
