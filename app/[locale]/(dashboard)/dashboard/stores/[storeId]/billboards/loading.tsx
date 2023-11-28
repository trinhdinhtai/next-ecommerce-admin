import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function BillboardsLoading() {
  return (
    <Shell>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />

      <DataTableLoading columnCount={5} filterableFieldCount={0} />
    </Shell>
  )
}
