import { prisma } from "@/lib/prismadb";

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  return product;
}

export async function getProductByStoreId(storeId: string) {
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
