import { Shell } from "@/components/ui/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function ProductNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Size not found"
        description="The size may have expired or you may have already updated your size"
      />
    </Shell>
  )
}
