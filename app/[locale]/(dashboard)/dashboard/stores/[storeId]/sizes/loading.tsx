import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"

export default function SizesLoading() {
  return (
    <Shell>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <DataTableSkeleton columnCount={11} filterableFieldCount={0} />
    </Shell>
  )
}
