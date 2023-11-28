import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function StoreIdLoading() {
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Skeleton className="h-10 w-[300px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-[360px]" />

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-5" />
              </CardHeader>
              <CardContent className="space-y-1">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}
