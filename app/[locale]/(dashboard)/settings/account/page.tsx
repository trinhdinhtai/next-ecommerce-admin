import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getScopedI18n } from "@/i18n/server"
import { currentUser } from "@clerk/nextjs"

import { env } from "@/env.mjs"
import { Shell } from "@/components/ui/shell"
import UpdateAccountForm from "@/components/forms/update-account-form"
import PageHeading from "@/components/PageHeading"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountPage() {
  const accountScope = await getScopedI18n("settings.account")
  const user = await currentUser()

  if (!user) return redirect("/sign-in")

  const formattedUser = {
    firstName: user.firstName,
    lastName: user.lastName,
  }

  return (
    <Shell>
      <PageHeading
        title={accountScope("title")}
        description={accountScope("description")}
      />

      <UpdateAccountForm user={formattedUser} />
    </Shell>
  )
}
