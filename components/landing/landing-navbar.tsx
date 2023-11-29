import Link from "next/link"
import { useParams } from "next/navigation"
import { Locale } from "@/i18n/config"

import { getDictionary } from "@/lib/dictionary"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import LogoIcon from "@/components/icons/logo"

interface LandingNavbarProps {
  dictionary: Record<string, any>
}

export default async function LandingNavbar({
  dictionary,
}: LandingNavbarProps) {
  return (
    <nav className="sticky top-0 z-30 bg-background p-4 shadow-sm dark:border-b dark:shadow-none">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoIcon className="h-8 text-purple-500" />
        </Link>
        <div className="flex items-center gap-x-2">
          <Link
            href="/sign-in"
            className={cn(buttonVariants(), "rounded-full")}
          >
            {dictionary.login}
          </Link>
        </div>
      </div>
    </nav>
  )
}
