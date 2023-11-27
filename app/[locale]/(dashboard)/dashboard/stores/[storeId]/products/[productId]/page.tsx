import { notFound } from "next/navigation"
import { getCategoriesByStoreId } from "@/_actions/categories"
import { getColorsByStoreIdAction } from "@/_actions/colors"
import { getProductById } from "@/_actions/products"
import { getSizesByStoreIdAction } from "@/_actions/sizes"

import { Shell } from "@/components/ui/shell"
import UpdateProductForm from "@/components/forms/update-product-form"
import PageHeading from "@/components/PageHeading"

interface ProductIdPageProps {
  params: {
    storeId: string
    productId: string
  }
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const { storeId, productId } = params
  const response = await Promise.all([
    getProductById(productId),
    getCategoriesByStoreId(storeId),
    getColorsByStoreIdAction(storeId),
    getSizesByStoreIdAction(storeId),
  ])

  const product = response[0]
  const categories = response[1]
  const colors = response[2]
  const sizes = response[3]

  if (!product) return notFound()

  return (
    <Shell>
      <PageHeading title={product.name} description="Edit Product" />
      <UpdateProductForm
        storeId={storeId}
        product={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </Shell>
  )
}

export default ProductIdPage
