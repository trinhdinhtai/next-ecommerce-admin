"use client"

import { useEffect } from "react"
import { useClerk } from "@clerk/nextjs"
import { HandleOAuthCallbackParams } from "@clerk/types"

import { Icons } from "@/components/icons"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallback({
  searchParams,
}: Readonly<SSOCallbackPageProps>) {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <Icons.Spinner className="h-16 w-16 animate-spin" aria-hidden="true" />
    </div>
  )
}
