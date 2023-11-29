"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "@/i18n/client"

import { Button } from "@/components/ui/button"
import LogoIcon from "@/components/icons/logo"

const LandingNavbar = () => {
  const params = useParams()
  const { t } = useTranslation(params.locale)

  return (
    <nav className="sticky top-0 z-30 bg-background p-4 shadow-sm dark:border-b dark:shadow-none">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoIcon className="h-8 text-purple-500" />
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href="/sign-in">
            <Button variant="outline" className="rounded-full">
              {t("login")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar
