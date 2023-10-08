import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"

export async function GET(
  _: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        products: {
          include: {
            images: true,
          },
        },
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
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
    const { name, billboardId } = body

    if (!name) {
      return new NextResponse("Category name is required", { status: 400 })
    }

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
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

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
