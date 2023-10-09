import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarGroupProps {
  avatars: string[]
}

const MAX_AVATARS = 3

export default function AvatarGroup({ avatars }: AvatarGroupProps) {
  const showAvatarCount = avatars.slice(0, MAX_AVATARS)
  const remainingAvatars = avatars.length - MAX_AVATARS

  return (
    <div className="relative flex -space-x-6 overflow-x-auto">
      {showAvatarCount.map((url, index) => (
        <Avatar key={index} className="h-12 w-12 border-2 bg-background">
          <AvatarImage src={url} alt="product image" />
        </Avatar>
      ))}
      {remainingAvatars > 0 && (
        <Avatar className="h-12 w-12 border-2 bg-background">
          <AvatarFallback className="font-semibold text-muted-foreground">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
