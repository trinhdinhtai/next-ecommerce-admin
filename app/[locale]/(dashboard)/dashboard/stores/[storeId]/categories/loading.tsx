import { Shell } from "@/components/ui/shell"
import { DataTableLoading } from "@/components/data-table-loading"
import PageHeading from "@/components/PageHeading"

export default function CategoriesLoading() {
  return (
    <Shell>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />

      <DataTableLoading columnCount={6} filterableFieldCount={0} />
    </Shell>
  )
}
