"use client"

import * as React from "react"
import { useScopedI18n } from "@/i18n/client"
import { useTheme } from "next-themes"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ThemeDialog() {
  const { theme, setTheme } = useTheme()
  const userMenuScope = useScopedI18n("userMenu.themeOptions")

  const handleChange = (value: string) => {
    setTheme(value)
  }

  return (
    <Select value={theme} onValueChange={handleChange}>
      <SelectTrigger className="w-fit text-sm">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="dark">{userMenuScope("dark")}</SelectItem>
          <SelectItem value="light">{userMenuScope("light")}</SelectItem>
          <SelectItem value="system">{userMenuScope("system")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
