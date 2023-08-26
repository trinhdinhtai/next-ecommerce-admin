"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";

interface DataTableRowActionsProps {
  columnId: string;
  entityName: "billboards" | "categories" | "products";
}

const DataTableRowActions = ({
  columnId,
  entityName,
}: DataTableRowActionsProps) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(columnId);
    toast.success("Copied to clipboard.");
  };

  const handleUpdate = () => {
    router.push(`/${params.storeId}/${entityName}/${columnId}`);
  };

  const handleDelete = async () => {
    toast.promise(onDeleting(), {
      loading: `Deleting ${entityName} ...`,
      success: "Deleted successfully",
      error: "Make sure you removed all products first",
    });
  };
  const onDeleting = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/${entityName}/${columnId}`);
      router.refresh();
    } catch (error) {
      throw error;
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DataTableRowActions;
