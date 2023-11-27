import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function SizeIdLoading() {
  return (
    <Shell>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="gap-8 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[14px] w-10" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-[14px] w-10" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </Shell>
  )
}
