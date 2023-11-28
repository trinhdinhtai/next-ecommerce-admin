import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function SizesLoading() {
  return (
    <Shell>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <DataTableLoading columnCount={11} filterableFieldCount={0} />
    </Shell>
  )
}
