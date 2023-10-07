import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function BillboardIdLoading() {
  return (
    <Shell>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[14px] w-10" />
            <Skeleton className="h-[90px] w-60" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-[14px] w-10" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </Shell>
  )
}
