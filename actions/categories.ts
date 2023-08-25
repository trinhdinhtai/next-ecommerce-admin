import { prisma } from "@/lib/prismadb";

export async function getCategoriesByStoreId(storeId: string) {
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
  });
  return categories;
}
