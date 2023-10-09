import { notFound } from "next/navigation"
import { getColorByIdAction } from "@/_actions/colors"

import { Shell } from "@/components/ui/shell"
import UpdateColorForm from "@/components/forms/update-color-form"
import PageHeading from "@/components/PageHeading"

interface ColorIdPageProps {
  params: {
    storeId: string
    colorId: string
  }
}

export default async function ColorIdPage({ params }: ColorIdPageProps) {
  const { colorId } = params
  const color = await getColorByIdAction(colorId)

  if (!color) return notFound()

  return (
    <Shell>
      <PageHeading title={color.name} description="Edit color" />
      <UpdateColorForm storeId={params.storeId} color={color} />
    </Shell>
  )
}
