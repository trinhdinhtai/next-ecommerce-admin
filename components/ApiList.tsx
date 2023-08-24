"use client";

import ApiAlert from "@/components/ApiAlert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOrigin } from "@/hooks/useOrigin";
import { LayoutDashboard } from "lucide-react";
import { useParams } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <div className="space-y-4">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};

export default ApiList;
