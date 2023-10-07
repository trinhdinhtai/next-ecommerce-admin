"use client"

import { deleteBillboardByIdsAction } from "@/_actions/billboards"
import { toast } from "sonner"

import { BillboardColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import DataTable from "@/components/ui/data-table"
import { billboardColumns } from "@/components/tables/columnDef/billboard"

interface CategoriesContentProps {
  data: BillboardColumn[]
  storeId: string
}

const BillboardsTable = ({ data, storeId }: CategoriesContentProps) => {
  const handleDeleteSelectedRows = async (selectedRowIds: string[]) => {
    toast.promise(deleteBillboardByIdsAction(selectedRowIds, storeId), {
      loading: "Deleting...",
      success: () => "Billboards deleted successfully.",
      error: (error) => {
        return catchError(error)
      },
    })
  }

  return (
    <DataTable
      columns={billboardColumns}
      data={data}
      searchKey="label"
      deleteRowsAction={handleDeleteSelectedRows}
    />
  )
}

export default BillboardsTable
