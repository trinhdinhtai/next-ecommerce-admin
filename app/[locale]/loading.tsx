import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="grid min-h-screen place-content-center">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  )
}
