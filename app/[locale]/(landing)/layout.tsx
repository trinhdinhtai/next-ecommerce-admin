import { PropsWithChildren } from "react"

import Background from "@/components/background"

export default function MarketingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <Background />
    </div>
  )
}
