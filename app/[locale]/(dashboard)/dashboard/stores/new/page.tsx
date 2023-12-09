import { redirect } from "next/navigation"
import { getScopedI18n } from "@/i18n/server"
import { auth } from "@clerk/nextjs"

import { Card, CardContent } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import AddStoreForm from "@/components/forms/add-store-form"
import PageHeading from "@/components/PageHeading"

export default async function NewStorePage() {
  const formHeadingScope = await getScopedI18n("form.heading")
  const entitiesScope = await getScopedI18n("entities")
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <Shell>
      <PageHeading
        title={formHeadingScope("title.create", {
          entity: entitiesScope("store"),
        })}
        description={formHeadingScope("description.create", {
          entity: entitiesScope("store"),
        })}
      />

      <Card as="section">
        <CardContent className="mt-6">
          <AddStoreForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
