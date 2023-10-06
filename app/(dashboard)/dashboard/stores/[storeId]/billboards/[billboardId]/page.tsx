import { prisma } from "@/lib/prismadb"
import { Shell } from "@/components/ui/shell"
import BillboardForm from "@/components/forms/BillboardForm"
import PageHeading from "@/components/PageHeading"

interface BillboardIdPageProps {
  params: {
    storeId: string
    billboardId: string
  }
}

const BillboardIdPage = async ({ params }: BillboardIdPageProps) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  })
  return (
    <Shell>
      <PageHeading
        title={billboard ? billboard.label : "Add Billboard"}
        description={billboard ? "Edit billboard" : "Add a new billboard"}
      />
      <BillboardForm billboard={billboard} />
    </Shell>
  )
}

export default BillboardIdPage
