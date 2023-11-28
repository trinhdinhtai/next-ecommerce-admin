import { Shell } from "@/components/ui/shell"
import AddColorForm from "@/components/forms/add-color-form"
import PageHeading from "@/components/PageHeading"

interface NewColorPageProps {
  params: {
    storeId: string
  }
}

export default function NewColorPage({ params }: NewColorPageProps) {
  return (
    <Shell>
      <PageHeading title="Add Color" description="Add a new color" />
      <AddColorForm storeId={params.storeId} />
    </Shell>
  )
}
