import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function NewCategoryLoading() {
  return (
    <Shell>
      <PageHeading title="Add Category" description="Add a new category" />

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-10">
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
