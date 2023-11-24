"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User } from "@/types"
import { useClerk } from "@clerk/nextjs"
import { ChevronDown, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCommandModal } from "@/hooks/useCommandModal"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeDialog } from "@/components/theme-dialog"

interface UserProps {
  user: User
}

const UserButton = ({ user }: UserProps) => {
  const { signOut } = useClerk()
  const { onOpen } = useCommandModal()
  const router = useRouter()

  const fullName = `${user?.firstName} ${user?.lastName}`
  const displayName = fullName || user?.username
  const handleOpenCommandModal = () => {
    onOpen()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="User button"
          className="h-12 w-64 justify-between border-none bg-transparent text-base"
        >
          <div className="flex items-center gap-2">
            <Avatar className="mr-2 h-9 w-9">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>

            <div className="flex flex-col text-left text-sm">
              <span>{displayName}</span>
              <span className="text-xs text-muted-foreground">
                {user.emailAddress}
              </span>
            </div>
          </div>

          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup className="mt-2 space-y-3">
          <DropdownMenuItem onClick={() => router.push("/dashboard/stores")}>
            Stores
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings/account")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mt-4" />

        <DropdownMenuGroup className="mt-4 space-y-3">
          <DropdownMenuItem
            className="mt-4 flex items-center justify-between"
            onClick={handleOpenCommandModal}
          >
            <span>Command Menu</span>
            <DropdownMenuShortcut className="space-x-1">
              <span className="rounded-sm border p-1">⌘</span>
              <span className="rounded-sm border p-1">K</span>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Theme
            <ThemeDialog />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mt-4" />

        <DropdownMenuGroup className="mt-4 space-y-3">
          <DropdownMenuItem className="mt-4 flex items-center justify-between">
            <Link href="https://gm-group.vn/" target="_blank">
              Homepage
            </Link>
            <ExternalLink className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => signOut()}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mt-4" />

        <DropdownMenuLabel>
          <Link
            href="/settings/billing"
            className={cn(buttonVariants(), "w-full")}
          >
            Upgrade your plan
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
