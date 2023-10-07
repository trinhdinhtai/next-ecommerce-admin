import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function ProductsLoading() {
  return (
    <Shell>
      <PageHeading
        title="Products"
        description="Manage Products for your store"
      />
      <DataTableLoading columnCount={11} filterableFieldCount={0} />
    </Shell>
  )
}
