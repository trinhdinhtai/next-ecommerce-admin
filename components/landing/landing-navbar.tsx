"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className="sticky top-0 z-30 bg-background p-4 shadow-sm dark:border-b dark:shadow-none">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image alt="Logo" src="/logo.png" width={40} height={40} />
          <h1 className="ml-2 bg-gradient-to-r from-[#1C79BD] to-[#5AA2D6] bg-clip-text text-3xl font-bold text-transparent">
            GM Admin
          </h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard/stores" : "/sign-up"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar
