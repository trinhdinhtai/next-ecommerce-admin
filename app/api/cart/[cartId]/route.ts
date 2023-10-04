import { NextResponse } from "next/server"

import { prisma } from "@/lib/prismadb"

export async function GET(
  _: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const { cartId } = params
    if (!cartId) {
      return new NextResponse("Cart id is required", { status: 400 })
    }

    const cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.log("[CART_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
