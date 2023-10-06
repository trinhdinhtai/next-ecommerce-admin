import { NextResponse } from "next/server"
import { getBillboardsByStoreId } from "@/_actions/billboards"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"

export async function GET(
  _: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const billboards = await getBillboardsByStoreId(params.storeId)
    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
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
    const { label, images } = body

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!Array.isArray(images) || !images?.length) {
      return new NextResponse("Invalid images", { status: 400 })
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

    const billboard = await prisma.billboard.create({
      data: {
        label,
        storeId: params.storeId,
        imageUrl: images[0].url,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
