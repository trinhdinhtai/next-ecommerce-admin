"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeDialog() {
  const { theme, setTheme } = useTheme();

  const handleChange = (value: string) => {
    setTheme(value);
  };

  return (
    <Select value={theme} onValueChange={handleChange}>
      <SelectTrigger className="w-fit text-sm">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
