"use client"

import { deleteProductsByProductIdsAction } from "@/_actions/products"
import { toast } from "sonner"

import { ProductColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import DataTable from "@/components/ui/data-table"
import { productColumns } from "@/components/tables/columnDef/product"

interface ProductsTableProps {
  storeId: string
  data: ProductColumn[]
}

const ProductsTable = ({ storeId, data }: ProductsTableProps) => {
  const handleDeleteSelectedRows = async (selectedRowIds: string[]) => {
    toast.promise(deleteProductsByProductIdsAction(selectedRowIds, storeId), {
      loading: "Deleting...",
      success: () => "Products deleted successfully.",
      error: (error) => catchError(error),
    })
  }

  return (
    <DataTable
      columns={productColumns}
      data={data}
      searchKey="name"
      deleteRowsAction={handleDeleteSelectedRows}
    />
  )
}

export default ProductsTable
