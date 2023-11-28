import { Shell } from "@/components/ui/shell"
import AddSizeForm from "@/components/forms/add-size-form"
import PageHeading from "@/components/PageHeading"

interface NewSizePageProps {
  params: {
    storeId: string
  }
}

export default function NewSizePage({ params }: NewSizePageProps) {
  return (
    <Shell>
      <PageHeading title="Add Size" description="Add a new size" />
      <AddSizeForm storeId={params.storeId} />
    </Shell>
  )
}
