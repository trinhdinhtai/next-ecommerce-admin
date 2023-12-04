import Link from "next/link"
import { getI18n } from "@/i18n/server"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LogoIcon from "@/components/icons/logo"
import LocaleSwitcher from "@/components/locale-switcher"

export default async function LandingNavbar() {
  const t = await getI18n()
  return (
    <nav className="sticky top-0 z-30 bg-background/75 p-4 shadow-sm backdrop-blur-lg animate-in fade-in slide-in-from-top-full duration-slow dark:border-b dark:shadow-none">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoIcon className="h-8 text-purple-500" />
        </Link>
        <div className="flex items-center gap-x-2">
          <LocaleSwitcher />
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "premium", size: "lg" }),
              "rounded-full"
            )}
          >
            {t("signIn.title")}
          </Link>
        </div>
      </div>
    </nav>
  )
}
