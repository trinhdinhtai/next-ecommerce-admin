import { getCategoriesByStoreId } from "@/_actions/categories"
import { getColorsByStoreId } from "@/_actions/colors"
import { getProductById } from "@/_actions/products"
import { getSizesByStoreId } from "@/_actions/sizes"

import { Shell } from "@/components/ui/shell"
import ProductForm from "@/components/forms/product-form"
import PageHeading from "@/components/PageHeading"

interface ProductIdPageProps {
  params: {
    storeId: string
    productId: string
  }
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const response = await Promise.all([
    getProductById(params.productId),
    getCategoriesByStoreId(params.storeId),
    getColorsByStoreId(params.storeId),
    getSizesByStoreId(params.storeId),
  ])

  const product = response[0]
  const categories = response[1]
  const colors = response[2]
  const sizes = response[3]

  return (
    <Shell>
      <PageHeading
        title={product ? product.name : "Add Product"}
        description={product ? "Edit Product" : "Add a new Product"}
      />
      <ProductForm
        product={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </Shell>
  )
}

export default ProductIdPage
