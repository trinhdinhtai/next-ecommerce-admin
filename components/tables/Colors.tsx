"use client"

import { deleteColorsByColorIdsAction } from "@/_actions/colors"
import { toast } from "sonner"

import { ColorColumn } from "@/types/columns"
import { catchError } from "@/lib/error"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"

import { colorColumns } from "./columnDef/color"

interface ColorsTableProps {
  storeId: string
  data: ColorColumn[]
}

const ColorsTable = ({ storeId, data }: ColorsTableProps) => {
  const handleDeleteSelectedRows = async (selectedRowIds: string[]) => {
    toast.promise(deleteColorsByColorIdsAction(selectedRowIds, storeId), {
      loading: "Deleting...",
      success: () => "Colors deleted successfully.",
      error: (error) => catchError(error),
    })
  }

  return (
    <DataTable
      columns={colorColumns}
      data={data}
      deleteRowsAction={handleDeleteSelectedRows}
    />
  )
}

export default ColorsTable
