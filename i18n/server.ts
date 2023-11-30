import { createI18nServer } from "next-international/server"

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import("@/i18n/locales/en"),
  vi: () => import("@/i18n/locales/vi"),
  ja: () => import("@/i18n/locales/ja"),
})
