import { Store } from "@prisma/client"
import { LucideIcon } from "lucide-react"

import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href: string
  icon: keyof typeof Icons
  disabled?: boolean
}

export type User = {
  firstName: string | null
  lastName: string | null
  emailAddress: string
  imageUrl: string
  username: string | null
}

export type EntityName =
  | "categories"
  | "billboards"
  | "products"
  | "sizes"
  | "colors"
  | "orders"
  | "customers"
  | "api-list"
  | "settings"

export type SidebarLink = {
  icon: LucideIcon
  href: string
  label: string
  disable?: boolean
  entityName?: EntityName
  entityId?: string
}

export type CuratedStore = {
  id: Store["id"]
  name: Store["name"]
  description: Store["description"]
}
