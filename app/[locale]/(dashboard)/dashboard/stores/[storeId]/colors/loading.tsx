import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function ColorsLoading() {
  return (
    <Shell>
      <PageHeading title="Colors" description="Manage colors for your store" />
      <DataTableLoading columnCount={4} filterableFieldCount={0} />
    </Shell>
  )
}
