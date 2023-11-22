import { getProductByStoreIdAction } from "@/_actions/products"
import { formatter } from "@/helpers/utils"
import { format } from "date-fns"

import { ProductColumn } from "@/types/columns"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import ProductsTable from "@/components/tables/product-table"

interface ProductsPageProps {
  params: {
    storeId: string
  }
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { storeId } = params

  const products = await getProductByStoreIdAction(storeId)

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    images: item.images.map((image) => image.url),
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    inventory: item.inventory,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Shell>
      <PageHeading
        title="Products"
        description="Manage products for your store"
      />
      <ProductsTable data={formattedProducts} storeId={storeId} />
    </Shell>
  )
}

export default ProductsPage
