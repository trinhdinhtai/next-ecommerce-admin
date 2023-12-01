import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"

export default function ColorsLoading() {
  return (
    <Shell>
      <PageHeading title="Colors" description="Manage colors for your store" />
      <DataTableSkeleton columnCount={4} filterableFieldCount={0} />
    </Shell>
  )
}
