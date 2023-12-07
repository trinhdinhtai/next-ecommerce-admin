import { getScopedI18n } from "@/i18n/server"

import { prisma } from "@/lib/prismadb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import DeleteStoreSection from "@/components/delete-store-section"
import UpdateStoreForm from "@/components/forms/update-store-form"
import PageHeading from "@/components/PageHeading"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const storeSettingsScope = await getScopedI18n("dashboard.stores.settings")

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  if (!store) return null

  return (
    <Shell>
      <PageHeading
        title={storeSettingsScope("title")}
        description={storeSettingsScope("description")}
      />

      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">
            {storeSettingsScope("updateStore")}
          </CardTitle>
          <CardDescription>
            {storeSettingsScope("updateStoreDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateStoreForm store={store} />
        </CardContent>
      </Card>

      <DeleteStoreSection storeId={store.id} />
    </Shell>
  )
}
