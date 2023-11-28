import Link from "next/link"
import { Locale } from "@/i18n.config"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import OAuthSignIn from "@/components/auth/oath-sign-in"
import SignUpForm from "@/components/auth/sign-up-form"
import { getDictionary } from "@/app/[locale]/dictionaries"

interface SignInPageProps {
  params: {
    locale: Locale
  }
}

export default async function SignUpPage({
  params: { locale },
}: SignInPageProps) {
  const t = await getDictionary(locale)

  return (
    <Shell className="max-w-xl">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t.signUp.title}</CardTitle>
          <CardDescription>{t.signUp.description}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t.signIn.continueWith}
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              {t.signUp.haveAccount}
            </span>
            <Link
              aria-label="Sign up"
              href="/sign-up"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              {t.signIn.title}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
