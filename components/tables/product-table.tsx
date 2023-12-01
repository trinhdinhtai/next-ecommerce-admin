"use client"

import { deleteProductsByProductIdsAction } from "@/_actions/products"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { ProductColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import { fetcher } from "@/lib/fetcher"
import DataTable from "@/components/ui/data-table"
import { productColumns } from "@/components/tables/columnDef/product-column"

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

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher(`/api/${storeId}/categories`),
  })

  return (
    <DataTable
      columns={productColumns}
      data={data}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
      filterableColumns={[
        {
          id: "category",
          title: "Category",
          options: categories
            ? categories.map(({ name }: Category) => ({
                label: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
                value: name,
              }))
            : [],
        },
      ]}
      deleteRowsAction={handleDeleteSelectedRows}
    />
  )
}

export default ProductsTable
