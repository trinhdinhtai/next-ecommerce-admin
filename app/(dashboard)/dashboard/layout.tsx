import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { dashboardConfig } from "@/config/dashboard"
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from "@/components/layout/navbar"
import SidebarNav from "@/components/layout/sidebar/sidebar-nav"

interface SetupLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: SetupLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <div className="grid flex-1 grid-cols-[280px_minmax(0,1fr)]">
        <aside className="sticky top-16 z-30 h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r">
          <ScrollArea className="mt-8">
            <SidebarNav items={dashboardConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
