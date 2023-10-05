"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

const SidebarNav = ({ items, className, ...props }: SidebarNavProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = Icons[item.icon]
        return (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                "flex items-center justify-center py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
                item.href.includes(String(segment)) &&
                  "bg-sky-700 text-white hover:text-secondary",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarNav
