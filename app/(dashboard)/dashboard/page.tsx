"use client"

import { useEffect } from "react"

import { useCreateStoreModal } from "@/hooks/use-create-store"

const DashboardPage = () => {
  const { isOpen, onOpen, isFirstCreate } = useCreateStoreModal()

  useEffect(() => {
    if (isFirstCreate) {
      return
    }
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen, isFirstCreate])

  return null
}

export default DashboardPage
