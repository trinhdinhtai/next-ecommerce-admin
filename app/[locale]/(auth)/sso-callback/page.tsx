import { Shell } from "@/components/ui/shell"
import SSOCallback, {
  SSOCallbackPageProps,
} from "@/components/auth/sso-callback"

export default function SSOCallbackPage({
  searchParams,
}: Readonly<SSOCallbackPageProps>) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
