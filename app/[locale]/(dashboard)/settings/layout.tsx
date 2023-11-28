import React, { PropsWithChildren } from "react"

import SettingsSidebar from "@/components/layout/sidebar/settings-sidebar"

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="container max-w-7xl px-3 py-4 sm:px-8 sm:py-8 2xl:max-w-[1600px]">
      <div className="flex h-full gap-8">
        <SettingsSidebar />
        {children}
      </div>
    </div>
  )
}
