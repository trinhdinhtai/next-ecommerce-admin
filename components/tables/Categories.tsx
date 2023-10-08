"use client"

import { deleteCategoriesByIdsAction } from "@/_actions/categories"
import { toast } from "sonner"

import { CategoryColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import { categoryColumns } from "@/components/tables/columnDef/category"

interface CategoriesTableProps {
  storeId: string
  data: CategoryColumn[]
}

const CategoriesTable = ({ storeId, data }: CategoriesTableProps) => {
  const handleDeleteSelectedRows = async (selectedRowIds: string[]) => {
    toast.promise(deleteCategoriesByIdsAction(selectedRowIds, storeId), {
      loading: "Deleting...",
      success: () => "Categories deleted successfully.",
      error: (error) => catchError(error),
    })
  }

  return (
    <Shell>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />
      <DataTable
        columns={categoryColumns}
        data={data}
        searchKey="name"
        deleteRowsAction={handleDeleteSelectedRows}
      />
    </Shell>
  )
}

export default CategoriesTable
