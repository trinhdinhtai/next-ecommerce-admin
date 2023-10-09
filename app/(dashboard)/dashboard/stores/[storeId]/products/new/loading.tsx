import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function NewProductLoading() {
  return (
    <Shell>
      <PageHeading title="Add Product" description="Add a new Product" />
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[14px] w-10" />
            <Skeleton className="h-10 w-full" />
          </div>

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

          <Skeleton className="h-[74px] w-[525px]" />

          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </Shell>
  )
}
