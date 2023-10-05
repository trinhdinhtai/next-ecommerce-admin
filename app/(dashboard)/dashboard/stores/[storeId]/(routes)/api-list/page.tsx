"use client";

import ApiList from "@/components/ApiList";
import PageHeading from "@/components/PageHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarLinks } from "@/constants";

const APIListPage = () => {
  return (
    <>
      <PageHeading
        title="APIs"
        description="Manage API Endpoint for your store"
      />

      {SidebarLinks.map(
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
    </>
  );
};

export default APIListPage;
