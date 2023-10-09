import { Shell } from "@/components/ui/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function ProductNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Color not found"
        description="The color may have expired or you may have already updated your color"
      />
    </Shell>
  )
}
