"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

interface ApiAlertProps {
  title: string;
  variant: "public" | "admin";
  description: string;
}

const ApiAlert = ({ title, variant, description }: ApiAlertProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied API endpoint to clipboard.");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>

        <Button variant="link" onClick={handleCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
