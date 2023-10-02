"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { SidebarLinks } from "@/constants"
import { SidebarLink } from "@/types"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const Links = () => {
  const params = useParams()
  const pathname = usePathname()

  const isActive = (link: SidebarLink) => {
    if (link.href === "") {
      return pathname === `/${params.storeId}`
    }
    return pathname === `/${params.storeId}/${link.href}`
  }

  return (
    <div className="space-y-2">
      {SidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={`/${params.storeId}/${link.href}`}
          className={cn(
            "mt-8 flex items-center gap-2 px-8 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
            isActive(link) &&
              "border-r-[3px] border-sky-700 bg-sky-200/20 text-sky-700 dark:bg-sky-200/10 dark:text-sky-500",
            link.disable && "opacity-50"
          )}
        >
          <link.icon></link.icon>
          {link.label}
          {link.disable && (
            <Badge variant="outline" size="sm">
              Coming soon
            </Badge>
          )}
        </Link>
      ))}
    </div>
  )
}

export default Links
