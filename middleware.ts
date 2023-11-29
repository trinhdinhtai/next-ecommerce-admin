import { NextResponse } from "next/server"
import { cookieName, fallbackLng, languages } from "@/i18n/settings"
import { authMiddleware } from "@clerk/nextjs"
import acceptLanguage from "accept-language"

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
  afterAuth(auth, req) {
    if (
      req.nextUrl.pathname.indexOf("icon") > -1 ||
      req.nextUrl.pathname.indexOf("chrome") > -1
    )
      return NextResponse.next()
    let lng
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"))
    if (!lng) lng = fallbackLng

    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      return NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
      )
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer")!)
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      )
      const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
