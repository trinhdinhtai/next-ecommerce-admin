import { Metadata } from "next"

import { env } from "@/env.mjs"
import { Shell } from "@/components/ui/shell"
import { UserProfile } from "@/components/auth/user-profile"
import PageHeading from "@/components/PageHeading"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

const AccountPage = () => {
  return (
    <Shell>
      <PageHeading title="Account" description="Manage your account settings" />

      <section>
        <UserProfile />
      </section>
    </Shell>
  )
}

export default AccountPage
