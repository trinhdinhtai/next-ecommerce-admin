import { prisma } from "@/lib/prismadb";

export async function getSizesByStoreId(storeId: string) {
  const sizes = await prisma.size.findMany({
    where: {
      storeId,
    },
  });

  return sizes;
}
