"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"

import { cn } from "@/lib/utils"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

const SidebarNav = ({ items, className, ...props }: SidebarNavProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link key={index} href={item.href}>
            <div className="flex items-center justify-center">
              <span
                className={cn(
                  "rounded-md p-3 text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
                  item.href.includes(String(segment)) &&
                    "bg-sky-700 text-white hover:text-secondary",
                  item.disabled && "pointer-events-none opacity-60"
                )}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarNav
