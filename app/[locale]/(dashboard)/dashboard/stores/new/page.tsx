import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Card, CardContent } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import AddStoreForm from "@/components/forms/add-store-form"
import PageHeading from "@/components/PageHeading"

export default async function NewStorePage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <Shell>
      <PageHeading
        title="New Store"
        description="Add a new store to your account"
      />

      <Card as="section">
        <CardContent className="mt-6">
          <AddStoreForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
