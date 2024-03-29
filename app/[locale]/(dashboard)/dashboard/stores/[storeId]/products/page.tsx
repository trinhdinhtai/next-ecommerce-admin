import { Suspense } from "react"
import { getProductByStoreIdAction } from "@/_actions/products"
import { formatter } from "@/helpers/utils"
import { format } from "date-fns"

import { ProductColumn } from "@/types/columns"
import { dashboardProductsSearchParamsSchema } from "@/lib/validations/params"
import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"
import ProductsTable from "@/components/tables/product-table"

interface ProductsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { storeId } = params

  const parseSearchParams =
    dashboardProductsSearchParamsSchema.parse(searchParams)

  const products = await getProductByStoreIdAction(storeId, parseSearchParams)

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

      <Suspense
        fallback={
          <DataTableSkeleton columnCount={11} filterableFieldCount={1} />
        }
      >
        <ProductsTable data={formattedProducts} storeId={storeId} />
      </Suspense>
    </Shell>
  )
}

export default ProductsPage
