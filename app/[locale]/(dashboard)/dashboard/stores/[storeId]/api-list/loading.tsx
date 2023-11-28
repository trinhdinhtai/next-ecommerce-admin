import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function ApiListLoading() {
  return (
    <Shell>
      <PageHeading
        title="APIs"
        description="Manage API Endpoint for your store"
      />

      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between py-4">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-7 w-28" />
          </div>

          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </Shell>
  )
}
