import { prisma } from "@/lib/prismadb";

export async function getColorsByStoreId(storeId: string) {
  const colors = await prisma.color.findMany({
    where: {
      storeId,
    },
  });

  return colors;
}
