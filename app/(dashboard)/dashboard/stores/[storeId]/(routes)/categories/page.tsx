import { format } from "date-fns"

import { CategoryColumn } from "@/types/columns"
import { prisma } from "@/lib/prismadb"
import CategoriesTable from "@/components/tables/Categories"

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    billboardLabel: item.billboard?.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return <CategoriesTable data={formattedCategories} />
}

export default CategoriesPage