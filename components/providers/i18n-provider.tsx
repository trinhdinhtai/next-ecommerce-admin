"use client"

import type { ReactNode } from "react"
import { I18nProviderClient } from "@/i18n/client"

type ProviderProps = {
  locale: string
  children: ReactNode
}

export default function I18nProvider({ locale, children }: ProviderProps) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
