import { ClerkProvider } from "@clerk/nextjs"

import "../globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import ModalProvider from "@/components/providers/modal-provider"
import QueryProvider from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import ToastProvider from "@/components/providers/toast-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocate inside of `pages`
const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "GMAdmin",
  description: "E-commerce management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(fontInter.variable, fontHeading.variable, "font-sans")}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              <ModalProvider />
              <ToastProvider />
              <ConfettiProvider />
              {children}
              <TailwindIndicator />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
