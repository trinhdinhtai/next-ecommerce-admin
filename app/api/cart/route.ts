import { NextResponse } from "next/server"

import { prisma } from "@/lib/prismadb"

export async function POST(_: Request) {
  try {
    const cart = await prisma.cart.create({
      data: {},
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.log("[CART_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
