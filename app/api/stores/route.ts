import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"

export async function GET(_: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const stores = await prisma.store.findMany({
      where: {
        userId,
      },
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.log("[STORES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    })

    const stores = await prisma.store.findMany({
      where: {
        userId,
      },
    })

    const isFirstStore = stores.length === 1

    return NextResponse.json({ store, isFirstStore })
  } catch (error) {
    console.log("[STORES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
