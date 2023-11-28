import React from "react"
import { Locale } from "@/i18n.config"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import { getDictionary } from "@/app/[locale]/dictionaries"

interface ResetPasswordPageProps {
  params: {
    locale: Locale
  }
}

export default async function ResetPasswordPage({
  params: { locale },
}: ResetPasswordPageProps) {
  const t = await getDictionary(locale)

  return (
    <Shell className="max-w-xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t.resetPassword.title}</CardTitle>
          <CardDescription>{t.resetPassword.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
