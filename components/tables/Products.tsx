"use client"

import { ProductColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import { productColumns } from "@/components/tables/columnDef/product"

interface ProductsTableProps {
  data: ProductColumn[]
}

const ProductsTable = ({ data }: ProductsTableProps) => {
  return (
    <Shell>
      <PageHeading
        title="Products"
        description="Manage Products for your store"
      />
      <DataTable columns={productColumns} data={data} searchKey="name" />
    </Shell>
  )
}

export default ProductsTable
