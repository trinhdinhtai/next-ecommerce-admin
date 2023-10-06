"use client"

import { BillboardColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { billboardColumns } from "@/components/tables/columnDef/billboard"

interface CategoriesContentProps {
  data: BillboardColumn[]
}

const BillboardsTable = ({ data }: CategoriesContentProps) => {
  return <DataTable columns={billboardColumns} data={data} searchKey="label" />
}

export default BillboardsTable
