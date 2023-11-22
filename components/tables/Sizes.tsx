"use client"

import { deleteSizesBySizeIdsAction } from "@/_actions/sizes"
import { toast } from "sonner"

import { SizeColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import DataTable from "@/components/ui/data-table"

import { sizeColumns } from "./columnDef/size"

interface SizesTableProps {
  storeId: string
  data: SizeColumn[]
}

const SizesTable = ({ storeId, data }: SizesTableProps) => {
  const handleDeleteSelectedRows = async (selectedRowIds: string[]) => {
    toast.promise(deleteSizesBySizeIdsAction(selectedRowIds, storeId), {
      loading: "Deleting...",
      success: () => "Sizes deleted successfully.",
      error: (error) => catchError(error),
    })
  }

  return (
    <DataTable
      columns={sizeColumns}
      data={data}
      deleteRowsAction={handleDeleteSelectedRows}
    />
  )
}

export default SizesTable
