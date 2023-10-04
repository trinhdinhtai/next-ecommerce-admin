import { prisma } from "@/lib/prismadb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UpdateStoreForm from "@/components/forms/update-store-form"
import PageHeading from "@/components/PageHeading"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  if (!store) return null

  return (
    <div>
      <PageHeading title="Settings" description="Manage store preferences" />

      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateStoreForm store={store} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
