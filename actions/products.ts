import { prisma } from "@/lib/prismadb";

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}
