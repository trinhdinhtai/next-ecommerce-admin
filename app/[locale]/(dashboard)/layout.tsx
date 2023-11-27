import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { User } from "@/types"
import { currentUser } from "@clerk/nextjs"

import Navbar from "@/components/layout/navbar"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const formattedUser: User = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0].emailAddress,
    username: user.username,
    imageUrl: user.imageUrl,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={formattedUser} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
