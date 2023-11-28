import { Shell } from "@/components/ui/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function CategoryNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Category not found"
        description="The category may have expired or you may have already updated your billboard"
      />
    </Shell>
  )
}
