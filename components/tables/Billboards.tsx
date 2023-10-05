"use client"

import { BillboardColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import { billboardColumns } from "@/components/tables/columnDef/billboard"

interface CategoriesContentProps {
  data: BillboardColumn[]
}

const BillboardsTable = ({ data }: CategoriesContentProps) => {
  return (
    <Shell>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />
      <DataTable columns={billboardColumns} data={data} searchKey="label" />
    </Shell>
  )
}

export default BillboardsTable
