"use client";

import ApiList from "@/components/ApiList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOrigin } from "@/hooks/useOrigin";
import { LayoutDashboard } from "lucide-react";
import { useParams } from "next/navigation";

const APIListPage = () => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="categories">
        <AccordionTrigger className="text-2xl font-semibold">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            Categories
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ApiList entityName="categories" entityIdName="categoryId" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default APIListPage;
