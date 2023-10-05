import { getBillboardsByStoreId } from "@/_actions/billboards"
import { getCategoryById } from "@/_actions/categories"

import CategoryForm from "@/components/forms/CategoryForm"
import PageHeading from "@/components/PageHeading"

interface CategoryIdPageProps {
  params: {
    storeId: string
    categoryId: string
  }
}

const CategoryIdPage = async ({ params }: CategoryIdPageProps) => {
  const response = await Promise.all([
    getCategoryById(params.categoryId),
    getBillboardsByStoreId(params.storeId),
  ])

  const category = response[0]
  const billboards = response[1]

  return (
    <>
      <PageHeading
        title={category ? category.name : "Add Category"}
        description={category ? "Edit category" : "Add a new category"}
      />
      <CategoryForm category={category} billboards={billboards} />
    </>
  )
}

export default CategoryIdPage