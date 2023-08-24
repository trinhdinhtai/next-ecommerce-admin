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

type CategoryFormInput = z.infer<typeof categorySchema>;

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      storeId: "",
    },
  });

  const onSubmit = async (values: CategoryFormInput) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Store created successfully");
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input placeholder="GM Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
