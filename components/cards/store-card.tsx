import Link from "next/link"
import { CuratedStore } from "@/types"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StoreCardProps {
  store: CuratedStore
  href: string
}

export default function StoreCard({ store, href }: Readonly<StoreCardProps>) {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>

        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{store.name}</CardTitle>
          {store.description ? (
            <CardDescription className="line-clamp-2">
              {store.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  )
}

StoreCard.Skeleton = function StoreCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={21 / 9}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
        <Skeleton className="absolute right-2 top-2 h-6 w-14 rounded-sm px-2 py-1" />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
  )
}
