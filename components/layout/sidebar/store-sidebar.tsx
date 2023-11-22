import StoreSidebarLinks from "@/components/layout/sidebar/store-sidebar-links"
import StoreSwitcher, { Store } from "@/components/StoreSwitcher"

interface StoreProps {
  currentStore: Store
  stores: Store[]
}

export default function StoreSidebar({ stores, currentStore }: StoreProps) {
  return (
    <nav className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-auto border-r bg-background py-5">
      <div className="flex justify-center">
        <StoreSwitcher stores={stores} currentStore={currentStore} />
      </div>
      <StoreSidebarLinks storeId={currentStore.id} />
    </nav>
  )
}
