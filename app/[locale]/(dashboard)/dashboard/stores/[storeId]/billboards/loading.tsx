import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"

export default function BillboardsLoading() {
  return (
    <Shell>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />

      <DataTableSkeleton columnCount={5} filterableFieldCount={0} />
    </Shell>
  )
}
