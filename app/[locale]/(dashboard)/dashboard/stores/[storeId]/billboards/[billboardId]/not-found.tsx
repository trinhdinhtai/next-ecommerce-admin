import { Shell } from "@/components/ui/shell"
import { ErrorCard } from "@/components/cards/error-card"

export default function BillboardNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Billboard not found"
        description="The billboard may have expired or you may have already updated your billboard"
      />
    </Shell>
  )
}
