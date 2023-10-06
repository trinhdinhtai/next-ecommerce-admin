import { prisma } from "@/lib/prismadb"

export async function getBillboardsByStoreId(storeId: string) {
  const billboards = await prisma.billboard.findMany({
    // select: {
    //   id: true,
    //   label: true,
    //   imageUrl: true,
    //   createdAt: true,
    // },
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return billboards
}
