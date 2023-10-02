import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import { categorySchema } from "@/lib/validations"

export async function GET(
  _: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const categories = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
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

    const body = await req.json()
    const { name, billboardId, imageUrl } = categorySchema.parse(body)

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

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        imageUrl,
        billboardId: billboardId,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
