"use client"

import { Separator } from "@radix-ui/react-dropdown-menu"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"

const StoreSettingLoading = () => {
  return (
    <Shell>
      <div className="mb-6">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="mb-3 mt-1 h-5 w-60" />
        <Separator />
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-5 w-96" />
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20" />
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </Shell>
  )
}

export default StoreSettingLoading
