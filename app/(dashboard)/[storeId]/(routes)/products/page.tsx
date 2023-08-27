import ProductsTable from "@/components/tables/Products";
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
      size: true,
      color: true,
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
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <ProductsTable data={formattedProducts} />;
};

export default ProductsPage;
