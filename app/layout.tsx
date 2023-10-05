import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { env } from "@/env.mjs"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import ModalProvider from "@/components/providers/modal-provider"
import QueryProvider from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import ToastProvider from "@/components/providers/toast-provider"

const inter = Inter({ subsets: ["latin"] })

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
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              <ModalProvider />
              <ToastProvider />
              <ConfettiProvider />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
