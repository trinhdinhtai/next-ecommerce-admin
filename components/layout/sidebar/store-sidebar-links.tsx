"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
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

  const links = [
    {
      label: "Dashboard",
      href: `/dashboard/stores/${storeId}`,
      icon: Gauge,
      isActive: segment === null,
    },
    {
      label: "Billboards",
      href: `/dashboard/stores/${storeId}/billboards`,
      icon: Monitor,
      isActive: segment === "billboards",
    },
    {
      label: "Categories",
      href: `/dashboard/stores/${storeId}/categories`,
      icon: LayoutDashboard,
      isActive: segment === "categories",
    },
    {
      label: "Products",
      href: `/dashboard/stores/${storeId}/products`,
      icon: ShoppingBasket,
      isActive: segment === "products",
    },
    {
      label: "Sizes",
      href: `/dashboard/stores/${storeId}/sizes`,
      icon: Minimize2,
      isActive: segment === "sizes",
    },
    {
      label: "Colors",
      href: `/dashboard/stores/${storeId}/colors`,
      icon: Palette,
      isActive: segment === "colors",
    },
    {
      label: "Orders",
      href: `/dashboard/stores/${storeId}/orders`,
      icon: ScrollText,
      isActive: segment === "orders",
    },
    {
      label: "Customers",
      href: `/dashboard/stores/${storeId}/customers`,
      icon: User,
      isActive: segment === "customers",
    },
    {
      label: "APIs",
      href: `/dashboard/stores/${storeId}/api-list`,
      icon: Zap,
      isActive: segment === "api-list",
    },
    {
      label: "Settings",
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
