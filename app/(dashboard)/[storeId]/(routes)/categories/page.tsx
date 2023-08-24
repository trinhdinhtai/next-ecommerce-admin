import { format } from "date-fns";

import { prisma } from "@/lib/prismadb";

import { CategoryColumn } from "@/types/columns";
import CategoriesContent from "@/components/CategoriesContent";

interface CategoriesPageProps {
  params: {
    storeId: string;
  };
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <CategoriesContent data={formattedCategories} />;
};

export default CategoriesPage;
