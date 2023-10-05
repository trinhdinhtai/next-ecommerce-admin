"use client"

import { useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { StoreSidebarLinks } from "@/config/store-sidebar-links"
import { useCommandModal } from "@/hooks/useCommandModal"
import Modal from "@/components/ui/modal"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"

const CommandModal = () => {
  const router = useRouter()
  const params = useParams()
  const { setTheme } = useTheme()
  const { isOpen, onOpen, onClose } = useCommandModal()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpen()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onOpen])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const runCommand = useCallback(
    (command: () => void) => {
      onClose()
      command()
    },
    [onClose]
  )

  const onNavigate = (href: string) => {
    router.push(`/${params.storeId}/${href}`)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Links">
          {StoreSidebarLinks.map((link) => (
            <CommandItem
              key={link.label.trim()}
              onSelect={() => runCommand(() => onNavigate(link.href))}
              className="space-x-2"
            >
              <link.icon></link.icon>
              <span>{link.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default CommandModal
