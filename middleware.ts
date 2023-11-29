// https://nextjs.org/docs/app/building-your-application/routing/internationalization

import { NextRequest, NextResponse } from "next/server"
import { i18n } from "@/i18n/config"
import { authMiddleware } from "@clerk/nextjs"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-locale matcher to get best locale
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
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/:locale/sign-out(.*)",
    "/sso-callback(.*)",
    "/api/webhook",
  ],
  afterAuth(auth, request) {
    const pathname = request.nextUrl.pathname
    const pathnameHasLocale = i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    const locale = getLocale(request)
    if (auth.isPublicRoute) {
      if (auth.userId) {
        let path = `${locale}/dashboard/stores`
        const storeSelection = new URL(path, request.url)
        return NextResponse.redirect(storeSelection)
      }
    }

    if (pathnameHasLocale) return NextResponse.next()
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    )
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
