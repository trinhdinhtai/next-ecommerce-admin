import { NextRequest, NextResponse } from "next/server"
import { i18n } from "@/i18n.config"
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/:locale",
    "/:locale/sign-in",
    "/:locale/sign-up",
    "/api/webhook",
  ],
  afterAuth(auth, request) {
    console.log("file: middleware.ts:25 ~ afterAuth ~ request:", request.url)
    const pathname = request.nextUrl.pathname
    const pathnameHasLocale = i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (auth.isPublicRoute) {
      if (pathnameHasLocale) return

      const locale = getLocale(request)
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      )
    }

    if (!auth.userId) {
      const locale = getLocale(request)
    }

    // if (auth.userId && auth.isPublicRoute) {
    //   let path = `${locale}/dashboard/stores`

    //   const storeSelection = new URL(path, request.url)
    //   return NextResponse.redirect(storeSelection)
    // }

    // if (!auth.userId && !auth.isPublicRoute) {
    //   return redirectToSignIn({ returnBackUrl: request.url })
    // }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
