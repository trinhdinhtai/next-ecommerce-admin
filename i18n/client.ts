"use client"

import { createI18nClient } from "next-international/client"

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import("@/i18n/locales/en"),
  vi: () => import("@/i18n/locales/vi"),
  ja: () => import("@/i18n/locales/ja"),
})
