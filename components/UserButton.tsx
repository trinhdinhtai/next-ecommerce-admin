"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ExternalLink, User as UserIcon } from "lucide-react";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCommandModal } from "@/hooks/useCommandModal";

interface UserProps {
  user: User;
}

const UserButton = ({ user }: UserProps) => {
  const { signOut } = useClerk();
  const { onOpen } = useCommandModal();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleOpenCommandModal = () => {
    onOpen();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="User button"
          className="w-full justify-between text-base bg-transparent border-none h-16"
        >
          <div className="flex items-center gap-2">
            <Avatar className="mr-2 h-10 w-10">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>

            <div className="flex flex-col gap-1 text-sm text-left">
              <span>{fullName}</span>
              <span className="text-muted-foreground text-xs">
                {user.emailAddress}
              </span>
            </div>
          </div>

          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="mr-2 h-10 w-10">
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            </Avatar>

            <div className="flex flex-col gap-1 text-sm text-left">
              <span>{fullName}</span>
              <span className="text-muted-foreground text-xs">
                {user.emailAddress}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup className="space-y-3 mt-4">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>My Profile</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mt-4" />

        <DropdownMenuGroup className="space-y-3 mt-4">
          <DropdownMenuItem
            className="flex items-center justify-between mt-4"
            onClick={handleOpenCommandModal}
          >
            <span>Command Menu</span>
            <DropdownMenuShortcut>
              <span className="border rounded-sm p-1">⌘</span>
              <span className="border rounded-sm p-1">K</span>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Theme
            <ThemeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mt-4" />

        <DropdownMenuGroup className="space-y-3 mt-4">
          <DropdownMenuItem className="flex items-center justify-between mt-4">
            <span>GM Solutions Homepage</span>
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
          <Button className="w-full">Upgrade to Pro</Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
