import Image from "next/image"
import Link from "next/link"
import { User } from "@/types"

import UserButton from "@/components/UserButton"

interface NavbarProps {
  user: User
}

const Navbar = async ({ user }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <Link href="/dashboard/stores">
        <Image alt="Logo" src="/logo.png" width={52} height={52} />
      </Link>

      <UserButton user={user} />
    </div>
  )
}

export default Navbar
