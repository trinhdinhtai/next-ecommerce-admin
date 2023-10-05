"use client"

import { SizeColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"

import { sizeColumns } from "./columnDef/size"

interface SizesTableProps {
  data: SizeColumn[]
}

const SizesTable = ({ data }: SizesTableProps) => {
  return (
    <Shell>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <DataTable columns={sizeColumns} data={data} searchKey="name" />
    </Shell>
  )
}

export default SizesTable
