"use client"

import { StoreSidebarLinks } from "@/config/store-sidebar-links"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Shell } from "@/components/ui/shell"
import ApiList from "@/components/ApiList"
import PageHeading from "@/components/PageHeading"

const APIListPage = () => {
  return (
    <Shell>
      <PageHeading
        title="APIs"
        description="Manage API Endpoint for your store"
      />

      {StoreSidebarLinks.map(
        (link) =>
          link.entityName &&
          link.entityId && (
            <Accordion key={link.href} type="multiple" className="w-full">
              <AccordionItem value={link.entityName}>
                <AccordionTrigger className="text-xl font-semibold">
                  <div className="flex items-center gap-2">
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ApiList
                    entityName={link.entityName}
                    entityIdName={link.entityId}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
      )}
    </Shell>
  )
}

export default APIListPage
