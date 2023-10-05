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
                "flex items-center gap-2 px-8 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
                item.href.includes(String(segment)) &&
                  "border-r-[3px] border-sky-700 bg-sky-200/20 text-sky-700 dark:bg-sky-200/10 dark:text-sky-500",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarNav
