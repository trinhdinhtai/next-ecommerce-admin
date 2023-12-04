"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useScopedI18n } from "@/i18n/client"
import {
  Gauge,
  LayoutDashboard,
  Minimize2,
  Monitor,
  Palette,
  ScrollText,
  Settings,
  ShoppingBasket,
  User,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface StoreSidebarLinksProps {
  storeId: string
}

const StoreSidebarLinks = ({ storeId }: StoreSidebarLinksProps) => {
  const segment = useSelectedLayoutSegment()
  const sidebarScope = useScopedI18n("sidebar")

  const links = [
    {
      label: sidebarScope("dashboard"),
      href: `/dashboard/stores/${storeId}`,
      icon: Gauge,
      isActive: segment === null,
    },
    {
      label: sidebarScope("billboards"),
      href: `/dashboard/stores/${storeId}/billboards`,
      icon: Monitor,
      isActive: segment === "billboards",
    },
    {
      label: sidebarScope("categories"),
      href: `/dashboard/stores/${storeId}/categories`,
      icon: LayoutDashboard,
      isActive: segment === "categories",
    },
    {
      label: sidebarScope("products"),
      href: `/dashboard/stores/${storeId}/products`,
      icon: ShoppingBasket,
      isActive: segment === "products",
    },
    {
      label: sidebarScope("sizes"),
      href: `/dashboard/stores/${storeId}/sizes`,
      icon: Minimize2,
      isActive: segment === "sizes",
    },
    {
      label: sidebarScope("colors"),
      href: `/dashboard/stores/${storeId}/colors`,
      icon: Palette,
      isActive: segment === "colors",
    },
    {
      label: sidebarScope("orders"),
      href: `/dashboard/stores/${storeId}/orders`,
      icon: ScrollText,
      isActive: segment === "orders",
    },
    {
      label: sidebarScope("customers"),
      href: `/dashboard/stores/${storeId}/customers`,
      icon: User,
      isActive: segment === "customers",
    },
    {
      label: sidebarScope("settings"),
      href: `/dashboard/stores/${storeId}/settings`,
      icon: Settings,
      isActive: segment === "settings",
    },
  ]

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "mt-8 flex items-center gap-2 px-8 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
            link.isActive &&
              "border-r-[3px] border-sky-700 bg-sky-200/20 text-sky-700 dark:bg-sky-200/10 dark:text-sky-500"
          )}
        >
          <link.icon></link.icon>
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export default StoreSidebarLinks
