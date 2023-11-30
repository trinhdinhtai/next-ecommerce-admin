import "../globals.css"

import { ConfettiProvider } from "@/components/providers/confetti-provider"
import I18nProvider from "@/components/providers/i18n-provider"
import ModalProvider from "@/components/providers/modal-provider"
import ToastProvider from "@/components/providers/toast-provider"

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function LocaleLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <I18nProvider locale={locale}>
      <ModalProvider />
      <ToastProvider />
      <ConfettiProvider />
      {children}
    </I18nProvider>
  )
}
