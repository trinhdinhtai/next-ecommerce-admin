import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"

export default function OrdersLoading() {
  return (
    <Shell>
      <PageHeading title="Orders" description="Manage orders for your store" />
      <DataTableSkeleton columnCount={8} filterableFieldCount={0} />
    </Shell>
  )
}
