import { notFound } from "next/navigation"
import { getBillboardsByStoreIdAction } from "@/_actions/billboards"
import { getCategoryById } from "@/_actions/categories"

import { Shell } from "@/components/ui/shell"
import UpdateCategoryForm from "@/components/forms/update-category-form"
import PageHeading from "@/components/PageHeading"

interface CategoryIdPageProps {
  params: {
    storeId: string
    categoryId: string
  }
}

const CategoryIdPage = async ({ params }: CategoryIdPageProps) => {
  const { storeId, categoryId } = params

  const response = await Promise.all([
    getCategoryById(categoryId),
    getBillboardsByStoreIdAction(storeId),
  ])

  const category = response[0]
  const billboards = response[1]

  if (!category) return notFound()

  return (
    <Shell>
      <PageHeading title={category.name} description="Edit category" />
      <UpdateCategoryForm
        storeId={storeId}
        category={category}
        billboards={billboards}
      />
    </Shell>
  )
}

export default CategoryIdPage
