import Image from "next/image"
import { redirect } from "next/navigation"
import { User } from "@/types"
import { auth, currentUser } from "@clerk/nextjs"

import UserButton from "@/components/UserButton"

const Navbar = async () => {
  const user = await currentUser()
  const { userId } = auth()

  if (!user || !userId) {
    redirect("/sign-in")
  }

  const formattedUser: User = {
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    emailAddress: user.emailAddresses[0].emailAddress,
    username: user.username,
  }

  return (
    <div className="flex h-full items-center justify-between border-b bg-background px-8 py-4">
      <Image alt="Logo" src="/logo.png" width={52} height={52} />

      <UserButton user={formattedUser} />
    </div>
  )
}

export default Navbar
