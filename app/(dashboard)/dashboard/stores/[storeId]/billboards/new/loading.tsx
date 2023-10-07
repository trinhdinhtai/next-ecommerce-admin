import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function NewBillboardLoading() {
  return (
    <Shell>
      <PageHeading title="Add Billboard" description="Add a new billboard" />
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5 space-y-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex flex-col gap-1.5 space-y-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </Shell>
  )
}
