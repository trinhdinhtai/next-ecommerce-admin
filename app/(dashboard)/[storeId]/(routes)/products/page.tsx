import ProductsContent from "@/components/ProductsContent";
import { formatter } from "@/helpers/utils";
import { prisma } from "@/lib/prismadb";
import { ProductColumn } from "@/types/columns";
import { format } from "date-fns";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <ProductsContent data={formattedProducts} />;
};

export default ProductsPage;
