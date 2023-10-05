"use client"

import { ColorColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"

import { colorColumns } from "./columnDef/color"

interface ColorsTableProps {
  data: ColorColumn[]
}

const ColorsTable = ({ data }: ColorsTableProps) => {
  return (
    <Shell>
      <PageHeading title="Colors" description="Manage colors for your store" />
      <DataTable columns={colorColumns} data={data} searchKey="name" />
    </Shell>
  )
}

export default ColorsTable
