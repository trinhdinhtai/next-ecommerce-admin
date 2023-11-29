import "server-only"

import { Locale } from "@/i18n/config"

const dictionaries = {
  en: () => import("@/i18n/locales/en.json").then((module) => module.default),
  vi: () => import("@/i18n/locales/vi.json").then((module) => module.default),
  ja: () => import("@/i18n/locales/ja.json").then((module) => module.default),
}
export const getDictionary = async (locale: Locale) => dictionaries[locale]()
