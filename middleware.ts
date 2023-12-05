import { NextResponse } from "next/server"
import { i18n } from "@/i18n/config"
import { authMiddleware } from "@clerk/nextjs"
import { createI18nMiddleware } from "next-international/middleware"

const I18nMiddleware = createI18nMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
})

// https://clerk.com/docs/references/nextjs/auth-middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/:locale",
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/:locale/sign-out(.*)",
    "/sso-callback(.*)",
    "/api/:path*",
  ],
  afterAuth(auth, request) {
    const pathname = request.nextUrl.pathname
    if (pathname.startsWith("/api")) return NextResponse.next()

    if (auth.isPublicRoute) {
      if (auth.userId) {
        let path = `/dashboard/stores`
        const storeSelection = new URL(path, request.url)
        return NextResponse.redirect(storeSelection)
      }
    }
  },
  beforeAuth(request) {
    // Execute next-intl middleware before Clerk's auth middleware
    return I18nMiddleware(request)
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
