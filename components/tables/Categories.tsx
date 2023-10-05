"use client"

import { CategoryColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import { categoryColumns } from "@/components/tables/columnDef/category"

interface CategoriesTableProps {
  data: CategoryColumn[]
}

const CategoriesTable = ({ data }: CategoriesTableProps) => {
  return (
    <Shell>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />
      <DataTable columns={categoryColumns} data={data} searchKey="name" />
    </Shell>
  )
}

export default CategoriesTable
