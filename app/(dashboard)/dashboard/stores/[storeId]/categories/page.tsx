import { getCategoriesByStoreIdAction } from "@/_actions/categories"
import { format } from "date-fns"

import { CategoryColumn } from "@/types/columns"
import CategoriesTable from "@/components/tables/Categories"

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { storeId } = params

  const categories = await getCategoriesByStoreIdAction(storeId)

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    billboardLabel: item.billboard?.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return <CategoriesTable data={formattedCategories} storeId={storeId} />
}

export default CategoriesPage
