import { LucideIcon } from "lucide-react";

export type User = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  imageUrl: string;
};

export type SidebarLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};
