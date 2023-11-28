import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function NewSizeLoading() {
  return (
    <Shell>
      <PageHeading title="Add Size" description="Add a new size" />
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
