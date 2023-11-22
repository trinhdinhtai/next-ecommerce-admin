"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import LoadingButton from "@/components/ui/loading-button"

interface DeleteStoreSectionProps {
  storeId: string
}

export default function DeleteStoreSection({
  storeId,
}: DeleteStoreSectionProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteStore = async () => {
    setIsDeleting(true)

    try {
      await axios.delete(`/api/${storeId}`)
      toast.success("Store deleted successfully!")
      router.refresh()
      router.push("/dashboard/stores")
    } catch (error) {
      throw error
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="relative rounded-lg border border-red-600">
      <div className="warning absolute inset-0 -z-10 opacity-30" />

      <div className="flex flex-col justify-between space-y-2 px-3 py-4 lg:flex-row lg:items-center lg:space-x-12">
        <div>
          <h2 className="mb-1 font-semibold text-red-600">
            Delete your store permanently
          </h2>

          <p className="text-sm">
            Note that deleting your store is irreversible. All your products and
            orders will be deleted.
          </p>
        </div>

        <LoadingButton
          type="submit"
          variant="warning"
          isLoading={isDeleting}
          onClick={handleDeleteStore}
          className="mt-4"
        >
          Delete store
        </LoadingButton>
      </div>
    </div>
  )
}
