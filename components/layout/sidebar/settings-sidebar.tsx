"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const links = [
    {
      label: "Account",
      href: `/settings/account`,
      isActive: segment === "account",
    },
    {
      label: "Billing",
      href: `/settings/billing`,
      isActive: segment === "billing",
    },
  ]
  return (
    <div className="flex flex-col gap-4 pb-8 pt-6 md:py-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
            link.isActive && "text-primary"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
