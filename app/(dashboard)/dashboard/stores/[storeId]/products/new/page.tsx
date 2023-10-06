import { getCategoriesByStoreId } from "@/_actions/categories"
import { getColorsByStoreId } from "@/_actions/colors"
import { getSizesByStoreId } from "@/_actions/sizes"

import { Shell } from "@/components/ui/shell"
import AddProductForm from "@/components/forms/add-product-form"
import PageHeading from "@/components/PageHeading"

interface NewProductPageProps {
  params: {
    storeId: string
  }
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const { storeId } = params
  const response = await Promise.all([
    getCategoriesByStoreId(storeId),
    getColorsByStoreId(storeId),
    getSizesByStoreId(storeId),
  ])

  const categories = response[0]
  const colors = response[1]
  const sizes = response[2]

  return (
    <Shell>
      <PageHeading title="Add Product" description="Add a new Product" />
      <AddProductForm
        storeId={storeId}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </Shell>
  )
}
