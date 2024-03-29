"use client"

import "/node_modules/flag-icons/css/flag-icons.min.css"

import { useChangeLocale, useCurrentLocale, useI18n } from "@/i18n/client"
import { i18n, Locale } from "@/i18n/config"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocaleFlag from "@/components/icons/locale-flag"

export default function LocaleSwitcher() {
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const t = useI18n()

  const handleChangeLocale = (newLocale: Locale) => {
    changeLocale(newLocale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <Button variant="outline" size="lg" className="px-4">
          <span className="hidden md:block">
            <span className="flex">
              <LocaleFlag locale={locale} />
              {t(`locales.${locale}`)}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("chooseLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(newLocale) => handleChangeLocale(newLocale as Locale)}
        >
          {i18n.locales.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale} className="flex">
              <LocaleFlag locale={locale} />
              {t(`locales.${locale}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
