import { prisma } from "@/lib/prismadb";

export async function getBillboardsByStoreId(storeId: string) {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });
  return billboards;
}
