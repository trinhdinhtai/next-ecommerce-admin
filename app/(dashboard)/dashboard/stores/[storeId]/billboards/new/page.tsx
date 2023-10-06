import { Shell } from "@/components/ui/shell"
import AddBillboardForm from "@/components/forms/add-billboard-form"
import PageHeading from "@/components/PageHeading"

interface NewBillboardPageProps {
  params: {
    storeId: string
  }
}

export default async function NewBillboardPage({
  params,
}: NewBillboardPageProps) {
  return (
    <Shell>
      <PageHeading title="Add Billboard" description="Add a new billboard" />
      <AddBillboardForm storeId={params.storeId} />
    </Shell>
  )
}
