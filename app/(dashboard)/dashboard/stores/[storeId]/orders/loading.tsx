import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function OrdersLoading() {
  return (
    <Shell>
      <PageHeading title="Orders" description="Manage orders for your store" />
      <DataTableLoading columnCount={8} filterableFieldCount={0} />
    </Shell>
  )
}
