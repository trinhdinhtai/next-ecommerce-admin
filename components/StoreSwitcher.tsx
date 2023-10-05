"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getAvatarFallback } from "@/helpers/utils"
import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCreateStoreModal } from "@/hooks/use-create-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type Store = {
  id: string
  name: string
}

interface StoreSwitcherProps {
  currentStore: Store
  stores: Store[]
}

type FormattedStore = {
  label: string
  value: string
}

const StoreSwitcher = ({ stores, currentStore }: StoreSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const { onOpen } = useCreateStoreModal()

  const formattedStores: FormattedStore[] = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }))

  const handleStoreChange = (store: FormattedStore) => {
    setOpen(false)
    router.push(pathname.replace(currentStore.id, store.value))
  }

  const handleOpenCreateStoreModal = () => {
    setOpen(false)
    onOpen()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-[250px] justify-between text-base"
        >
          <Avatar className="mr-2 h-7 w-7">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt={currentStore.name}
            />
            <AvatarFallback>
              {getAvatarFallback(currentStore.name)}
            </AvatarFallback>
          </Avatar>
          {currentStore.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => handleStoreChange(store)}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/123345.png`}
                      alt={store.label}
                      className="grayscale"
                    />
                    <AvatarFallback>
                      {getAvatarFallback(store.label)}
                    </AvatarFallback>
                  </Avatar>
                  {store.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore.id === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={handleOpenCreateStoreModal}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
