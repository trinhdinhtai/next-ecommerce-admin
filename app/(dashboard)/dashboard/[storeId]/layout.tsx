import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="flex">
      <div className="fixed inset-y-0 z-50 h-20 w-full">
        <Navbar />
      </div>

      <div className="fixed inset-y-0 z-40 h-screen w-72 pt-20">
        <Sidebar />
      </div>

      <div className="ml-72 w-full pt-20">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
