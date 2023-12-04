import { PropsWithChildren } from "react"

import Background from "@/components/background"
import LandingFooter from "@/components/landing/landing-footer"
import LandingNavbar from "@/components/landing/landing-navbar"

export default function MarketingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <Background />
      <LandingFooter />
    </div>
  )
}
