"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/validators";
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
import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CategoryFormInput = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category: Category | null;
  billboards: Billboard[];
}

const CategoryForm = ({ category, billboards }: CategoryFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const loadingMessage = category
    ? "Updating category ..."
    : "Creating category ...";
  const toastMessage = category ? "Category updated." : "Category created.";
  const action = category ? "Save changes" : "Create";

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      billboardId: category?.billboardId || "",
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
      throw error;
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

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
