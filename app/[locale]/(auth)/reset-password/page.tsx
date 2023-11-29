import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import ResetPasswordForm from "@/components/auth/reset-password-form"

interface ResetPasswordPageProps {
  params: {
    locale: Locale
  }
}

export default async function ResetPasswordPage({
  params: { locale },
}: ResetPasswordPageProps) {
  return (
    <Shell className="max-w-xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{"resetPassword.title"}</CardTitle>
          <CardDescription>{"resetPassword.description"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
