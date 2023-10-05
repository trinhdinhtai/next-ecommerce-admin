import Links from "@/components/layout/sidebar/Links"
import StoreSwitcher, { Store } from "@/components/StoreSwitcher"

interface StoreProps {
  currentStore: Store
  stores: Store[]
}

export default function StoreSidebar({ stores, currentStore }: StoreProps) {
  return (
    <nav className="flex h-full flex-col overflow-auto border-r bg-background py-5">
      <div className="flex justify-center">
        <StoreSwitcher stores={stores} currentStore={currentStore} />
      </div>
      <Links />
    </nav>
  )
}
