"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema, createStoreSchema } from "@/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

type CategoryFormInput = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category: Category | null;
}

const CategoryForm = ({ category }: CategoryFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const loadingMessage = category
    ? "Creating category ..."
    : "Updating category ...";
  const toastMessage = category ? "Category updated." : "Category created.";
  const action = category ? "Save changes" : "Create";

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      storeId: "",
    },
  });

  const onSubmit = async (values: CategoryFormInput) => {
    toast.promise(onCreateCategory(values), {
      loading: loadingMessage,
      success: toastMessage,
      error: "Something went wrong",
    });
  };

  const onCreateCategory = async (values: CategoryFormInput) => {
    try {
      setIsLoading(true);
      if (!category) {
        await axios.post(`/api/${params.storeId}/categories`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
