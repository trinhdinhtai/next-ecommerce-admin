import { getAvatarFallback } from "@/helpers/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Tilt from "react-parallax-tilt"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type Testimonial = {
  name: string
  avatarUrl: string
  title: string
  description: string
}

interface TestimonialProps {
  item: Testimonial
}

export default function TestimonialCard({ item }: TestimonialProps) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <Card className="flex h-full w-full flex-col gap-3 bg-transparent px-4 py-2 dark:shadow-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={item.avatarUrl}
                alt="Avatar"
                className="rounded-full"
              />
              <AvatarFallback>{getAvatarFallback(item.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm leading-relaxed">
          {item.description}
        </CardContent>
      </Card>
    </Tilt>
  )
}
