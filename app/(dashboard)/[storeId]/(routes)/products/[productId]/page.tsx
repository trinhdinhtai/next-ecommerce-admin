import { getCategoriesByStoreId } from "@/actions/categories"
import { getColorsByStoreId } from "@/actions/colors"
import { getProductById } from "@/actions/products"
import { getSizesByStoreId } from "@/actions/sizes"

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
    <>
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
    </>
  )
}

export default ProductIdPage
