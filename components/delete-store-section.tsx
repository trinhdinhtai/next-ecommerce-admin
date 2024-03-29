"use client"

import { useScopedI18n } from "@/i18n/client"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import LoadingButton from "@/components/ui/loading-button"
import { deleteStore } from "@/app/_actions/stores/delete-store"

interface DeleteStoreSectionProps {
  storeId: string
}

export default function DeleteStoreSection({
  storeId,
}: DeleteStoreSectionProps) {
  const storeSettingsScope = useScopedI18n("dashboard.stores.settings")
  const buttonScope = useScopedI18n("button")

  const { execute, isLoading } = useAction(deleteStore, {
    onSuccess: ({ name }) => {
      toast.success(`Store ${name} deleted successfully`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  return (
    <div className="relative rounded-lg border border-red-600">
      <div className="warning absolute inset-0 -z-10 opacity-40 dark:opacity-20" />

      <div className="flex flex-col justify-between space-y-2 px-3 py-4 lg:flex-row lg:items-center lg:space-x-12">
        <div>
          <h2 className="mb-1 font-semibold text-red-600">
            {storeSettingsScope("deleteStore")}
          </h2>

          <p className="text-sm">{storeSettingsScope("deleteStoreWarning")}</p>
        </div>

        <LoadingButton
          type="submit"
          variant="warning"
          isLoading={isLoading}
          onClick={() => execute({ id: storeId })}
          className="mt-4"
        >
          {buttonScope("deleteStore")}
        </LoadingButton>
      </div>
    </div>
  )
}
