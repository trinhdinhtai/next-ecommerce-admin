import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import { storeSchema } from "@/lib/validations/store"

export async function PATCH(
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
    const { name, description } = storeSchema.parse(body)

    if (!name) {
      return new NextResponse("Store name is required", { status: 400 })
    }

    const store = await prisma.store.update({
      where: {
        id: params.storeId,
      },
      data: {
        name,
        description,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _: Request,
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

    const store = await prisma.store.delete({
      where: {
        id: params.storeId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
