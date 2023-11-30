// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { i18n } from "@/i18n/config"
import { authMiddleware } from "@clerk/nextjs"
import { createI18nMiddleware } from "next-international/middleware"

const I18nMiddleware = createI18nMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
})

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
    console.log("test")
    const pathname = request.nextUrl.pathname
    if (pathname.startsWith("/api")) return NextResponse.next()

    if (auth.isPublicRoute) {
      if (auth.userId) {
        let path = `/dashboard/stores`
        const storeSelection = new URL(path, request.url)
        return NextResponse.redirect(storeSelection)
      }
    }

    return I18nMiddleware(request)
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
