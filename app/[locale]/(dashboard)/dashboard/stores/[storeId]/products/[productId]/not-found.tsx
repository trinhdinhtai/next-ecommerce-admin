import { Shell } from "@/components/ui/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function ProductNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Product not found"
        description="The product may have expired or you may have already updated your product"
      />
    </Shell>
  )
}
