import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { getStoresSchema } from "@/lib/validations/store"

export async function getStoresAction({
  userId,
}: z.infer<typeof getStoresSchema>) {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return stores
}
