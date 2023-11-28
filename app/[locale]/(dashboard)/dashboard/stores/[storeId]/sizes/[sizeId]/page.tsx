import { notFound } from "next/navigation"
import { getSizeByIdAction } from "@/_actions/sizes"

import { Shell } from "@/components/ui/shell"
import UpdateSizeForm from "@/components/forms/update-size-form"
import PageHeading from "@/components/PageHeading"

interface SizeIdPageProps {
  params: {
    storeId: string
    sizeId: string
  }
}

const SizeIdPage = async ({ params }: SizeIdPageProps) => {
  const { sizeId } = params
  const size = await getSizeByIdAction(sizeId)

  if (!size) return notFound()

  return (
    <Shell>
      <PageHeading title={size.name} description="Edit size" />
      <UpdateSizeForm storeId={params.storeId} size={size} />
    </Shell>
  )
}

export default SizeIdPage
