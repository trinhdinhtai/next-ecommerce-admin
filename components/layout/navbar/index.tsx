import Image from "next/image"
import { User } from "@clerk/nextjs/server"

import UserButton from "@/components/UserButton"

interface NavbarProps {
  user: User
}

const Navbar = async ({ user }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <Image alt="Logo" src="/logo.png" width={52} height={52} />

      <UserButton user={user} />
    </div>
  )
}

export default Navbar
