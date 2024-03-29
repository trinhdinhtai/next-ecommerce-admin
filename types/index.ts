import { PLAN_TYPE, Store } from "@prisma/client"
import { LucideIcon } from "lucide-react"
import { FileWithPath } from "react-dropzone"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
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

export interface SubscriptionPlan {
  id: PLAN_TYPE
  name: string
  description: string
  features: string[]
  price: number
  popular?: boolean
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export interface StoredFile {
  id: string
  name: string
  url: string
}
