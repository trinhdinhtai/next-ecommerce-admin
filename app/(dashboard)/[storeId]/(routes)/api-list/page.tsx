"use client";

import ApiList from "@/components/ApiList";
import PageHeading from "@/components/PageHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LayoutDashboard, Monitor } from "lucide-react";

const APIListPage = () => {
  return (
    <>
      <PageHeading
        title="APIs"
        description="Manage API Endpoint for your store"
      />

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="billboards">
          <AccordionTrigger className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Billboards
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ApiList entityName="billboards" entityIdName="billboardId" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Categories
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ApiList entityName="categories" entityIdName="categoryId" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default APIListPage;
