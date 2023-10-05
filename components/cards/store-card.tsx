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

interface StoreCardProps {
  store: CuratedStore
  href: string
}

const StoreCard = ({ store, href }: StoreCardProps) => {
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

export default StoreCard
