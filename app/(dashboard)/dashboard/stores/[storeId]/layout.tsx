import { ReactNode } from "react"

import Sidebar from "@/components/layout/sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-full">
      <div className="w-72">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
