import { LucideIcon } from "lucide-react";

export type User = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  imageUrl: string;
  username: string | null;
};

export type SidebarLink = {
  icon: LucideIcon;
  href: string;
  label: string;
  disable?: boolean;
  entityName?: string;
  entityId?: string;
};
