import { Locale } from "@/i18n/config"
import { getI18n, getScopedI18n } from "@/i18n/server"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export default async function ResetPasswordPage() {
  const resetPasswordScope = await getScopedI18n("forgotPassword")

  return (
    <Shell className="max-w-xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {resetPasswordScope("title")}
          </CardTitle>
          <CardDescription>{resetPasswordScope("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
