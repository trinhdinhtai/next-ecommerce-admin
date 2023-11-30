import Link from "next/link"
import { getI18n } from "@/i18n/server"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LogoIcon from "@/components/icons/logo"

export default async function LandingNavbar() {
  const t = await getI18n()
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
            {t("signIn.title")}
          </Link>
        </div>
      </div>
    </nav>
  )
}
